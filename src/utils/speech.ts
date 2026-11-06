import { LanguageCode } from '../i18n/translations.ts';

let currentAudio: HTMLAudioElement | null = null;
let speechCallback: (() => void) | null = null;

const LANG_LOCALES: Record<LanguageCode, string> = {
  kn: 'kn-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  en: 'en-IN',
};

// Clean text for speech synthesis (strip markdown, URLs, excessive punctuation)
export function sanitizeTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\n\r]+/g, '. ')
    .replace(/[•·]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Speak text in the specified language (Kannada, Hindi, Tamil, Telugu, Bengali, English).
 * First attempts Web Speech API; seamlessly falls back to server-side Gemini TTS (/api/tts).
 */
export async function speakText(
  text: string,
  lang: LanguageCode = 'kn',
  onEnd?: () => void
): Promise<void> {
  stopSpeaking();
  speechCallback = onEnd || null;

  const cleanText = sanitizeTextForSpeech(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // 1. Try Browser Web Speech API if supported and has matching voice
  if ('speechSynthesis' in window) {
    const locale = LANG_LOCALES[lang] || 'kn-IN';
    const voices = window.speechSynthesis.getVoices();
    const hasLocaleVoice = voices.some(
      (v) => v.lang.toLowerCase().startsWith(lang) || v.lang.toLowerCase() === locale.toLowerCase()
    );

    // If native voice exists for the language, use speech synthesis for zero network latency
    if (hasLocaleVoice) {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = locale;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const matchingVoice = voices.find(
        (v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.toLowerCase().startsWith(lang)
      );
      if (matchingVoice) utterance.voice = matchingVoice;

      utterance.onend = () => {
        if (speechCallback) speechCallback();
      };
      utterance.onerror = () => {
        // Fall back to server TTS on error
        fallbackToServerTTS(cleanText, lang, onEnd);
      };

      window.speechSynthesis.speak(utterance);
      return;
    }
  }

  // 2. Otherwise use server-side Gemini TTS (high-quality native WAV audio)
  await fallbackToServerTTS(cleanText, lang, onEnd);
}

async function fallbackToServerTTS(
  cleanText: string,
  lang: LanguageCode,
  onEnd?: () => void
): Promise<void> {
  try {
    // Truncate to reasonable sentence chunk for fast audio streaming
    const spokenChunk = cleanText.slice(0, 500);
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: spokenChunk, language: lang }),
    });

    const data = await res.json();
    if (data.success && data.audioBase64) {
      const audioUrl = `data:audio/wav;base64,${data.audioBase64}`;
      currentAudio = new Audio(audioUrl);
      currentAudio.onended = () => {
        currentAudio = null;
        if (onEnd) onEnd();
      };
      currentAudio.onerror = () => {
        currentAudio = null;
        if (onEnd) onEnd();
      };
      await currentAudio.play();
    } else {
      if (onEnd) onEnd();
    }
  } catch (err) {
    console.warn('TTS playback error, calling browser fallback:', err);
    if (onEnd) onEnd();
  }
}

/**
 * Stop any ongoing speech playback (both Web Speech and HTML5 Audio)
 */
export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (speechCallback) {
    speechCallback();
    speechCallback = null;
  }
}

/**
 * Check if speech is currently playing
 */
export function isSpeaking(): boolean {
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    return true;
  }
  if (currentAudio && !currentAudio.paused) {
    return true;
  }
  return false;
}

/**
 * Speech Recognition (Microphone Voice Input in Kannada, Hindi, etc.)
 */
export function listenSpeech(
  lang: LanguageCode,
  onResult: (transcript: string) => void,
  onError?: (err: string) => void
): () => void {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError('Speech recognition is not supported in this browser.');
    return () => {};
  }

  const recognition = new SpeechRecognition();
  recognition.lang = LANG_LOCALES[lang] || 'kn-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    if (text) onResult(text);
  };

  recognition.onerror = (event: any) => {
    if (onError) onError(event.error || 'Recognition error');
  };

  recognition.start();

  return () => {
    recognition.stop();
  };
}
