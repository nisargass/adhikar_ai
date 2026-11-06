import initSqlJs, { Database as SqlDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../../adhikarai.sqlite');

export interface DbUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  last_login_at: string;
}

export interface DbUserProfile {
  id: number;
  user_id?: number | null;
  name: string;
  email: string;
  age: number;
  annual_income: number;
  state: string;
  caste: string;
  gender: string;
  occupation: string;
  owns_land: number;
  land_acres: number;
  is_student: number;
  has_completed_profile: number;
  created_at: string;
  updated_at: string;
}

export interface DbUserEntry {
  id: number;
  email: string;
  action_type: string;
  details: string;
  timestamp: string;
}

let dbInstance: SqlDatabase | null = null;

function saveToDisk(): void {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (err) {
    console.error('❌ Failed to persist SQLite database to disk:', err);
  }
}

/**
 * Initializes SQLite database (Pure WebAssembly SQLite engine - 100% portable)
 */
export async function initSqliteDb(): Promise<SqlDatabase> {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      dbInstance = new SQL.Database(fileBuffer);
      console.log(`\n📦 Existing SQLite database successfully loaded from: ${DB_PATH}`);
    } catch (e) {
      console.warn('⚠️ Could not parse existing database file, creating fresh SQLite database:', e);
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
    console.log(`\n📦 New SQLite database initialized at: ${DB_PATH}`);
  }

  // Create tables
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      created_at TEXT NOT NULL,
      last_login_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      age INTEGER NOT NULL,
      annual_income REAL NOT NULL,
      state TEXT NOT NULL,
      caste TEXT NOT NULL,
      gender TEXT NOT NULL,
      occupation TEXT NOT NULL,
      owns_land INTEGER DEFAULT 0,
      land_acres REAL DEFAULT 0,
      is_student INTEGER DEFAULT 0,
      has_completed_profile INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS user_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      action_type TEXT NOT NULL,
      details TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  saveToDisk();
  await printDatabaseStateToTerminal('Database Engine Started');
  return dbInstance;
}

/**
 * Records User Login / Registration
 */
export async function recordUserLogin(params: {
  name: string;
  email: string;
  password?: string;
  action: 'register' | 'login';
}): Promise<DbUser> {
  await initSqliteDb();
  if (!dbInstance) throw new Error('SQLite database not initialized');

  const now = new Date().toISOString();
  const email = params.email.trim().toLowerCase();
  const name = params.name.trim();
  const password = params.password || '';

  // Check if user exists
  const stmt = dbInstance.prepare('SELECT id, name, email, password, created_at, last_login_at FROM users WHERE email = :email');
  stmt.bind({ ':email': email });
  const hasRow = stmt.step();
  const existingUser = hasRow ? (stmt.getAsObject() as unknown as DbUser) : null;
  stmt.free();

  let userId: number;
  if (existingUser) {
    dbInstance.run(
      'UPDATE users SET name = :name, last_login_at = :now, password = CASE WHEN :pwd != "" THEN :pwd ELSE password END WHERE id = :id',
      {
        ':name': name,
        ':now': now,
        ':pwd': password,
        ':id': existingUser.id,
      }
    );
    userId = existingUser.id;
  } else {
    dbInstance.run(
      'INSERT INTO users (name, email, password, created_at, last_login_at) VALUES (:name, :email, :password, :created_at, :last_login_at)',
      {
        ':name': name,
        ':email': email,
        ':password': password,
        ':created_at': now,
        ':last_login_at': now,
      }
    );
    const idRes = dbInstance.exec('SELECT last_insert_rowid() as id');
    userId = Number(idRes[0].values[0][0]);
  }

  // Record audit entry
  dbInstance.run(
    'INSERT INTO user_entries (email, action_type, details, timestamp) VALUES (:email, :action_type, :details, :timestamp)',
    {
      ':email': email,
      ':action_type': params.action.toUpperCase(),
      ':details': JSON.stringify({
        name,
        email,
        timestamp: now,
        action: params.action,
        client: 'AdhikarAI Citizen Web App',
      }),
      ':timestamp': now,
    }
  );

  saveToDisk();

  const userStmt = dbInstance.prepare('SELECT id, name, email, password, created_at, last_login_at FROM users WHERE id = :id');
  userStmt.bind({ ':id': userId });
  userStmt.step();
  const updatedUser = userStmt.getAsObject() as unknown as DbUser;
  userStmt.free();

  // Print nicely formatted log to terminal
  printUserEventToTerminal({
    eventType: params.action === 'register' ? 'NEW USER REGISTRATION' : 'USER LOGIN ENTRY',
    email,
    name,
    timestamp: now,
    databaseId: userId,
  });

  return updatedUser;
}

/**
 * Saves Citizen Demographic & Eligibility Profile
 */
export async function saveUserProfile(profile: {
  name: string;
  email: string;
  age: number;
  annualIncome: number;
  state: string;
  caste: string;
  gender: string;
  occupation: string;
  ownsLand?: boolean;
  landAcres?: number;
  isStudent?: boolean;
  hasCompletedProfile?: boolean;
}): Promise<DbUserProfile> {
  await initSqliteDb();
  if (!dbInstance) throw new Error('SQLite database not initialized');

  const now = new Date().toISOString();
  const email = profile.email.trim().toLowerCase();
  const name = profile.name.trim();

  // Check linked user id
  const userStmt = dbInstance.prepare('SELECT id FROM users WHERE email = :email');
  userStmt.bind({ ':email': email });
  const userHasRow = userStmt.step();
  const userId = userHasRow ? Number((userStmt.getAsObject() as any).id) : null;
  userStmt.free();

  // Check if profile exists
  const profStmt = dbInstance.prepare('SELECT id FROM user_profiles WHERE email = :email');
  profStmt.bind({ ':email': email });
  const profHasRow = profStmt.step();
  const existingProf = profHasRow ? profStmt.getAsObject() : null;
  profStmt.free();

  if (existingProf) {
    dbInstance.run(
      `UPDATE user_profiles SET
        user_id = COALESCE(:userId, user_id),
        name = :name,
        age = :age,
        annual_income = :annual_income,
        state = :state,
        caste = :caste,
        gender = :gender,
        occupation = :occupation,
        owns_land = :owns_land,
        land_acres = :land_acres,
        is_student = :is_student,
        has_completed_profile = 1,
        updated_at = :updated_at
      WHERE email = :email`,
      {
        ':userId': userId,
        ':name': name,
        ':age': profile.age,
        ':annual_income': profile.annualIncome,
        ':state': profile.state,
        ':caste': profile.caste,
        ':gender': profile.gender,
        ':occupation': profile.occupation,
        ':owns_land': profile.ownsLand ? 1 : 0,
        ':land_acres': profile.landAcres || 0,
        ':is_student': profile.isStudent ? 1 : 0,
        ':updated_at': now,
        ':email': email,
      }
    );
  } else {
    dbInstance.run(
      `INSERT INTO user_profiles (
        user_id, name, email, age, annual_income, state, caste, gender,
        occupation, owns_land, land_acres, is_student, has_completed_profile, created_at, updated_at
      ) VALUES (
        :userId, :name, :email, :age, :annual_income, :state, :caste, :gender,
        :occupation, :owns_land, :land_acres, :is_student, 1, :created_at, :updated_at
      )`,
      {
        ':userId': userId,
        ':name': name,
        ':email': email,
        ':age': profile.age,
        ':annual_income': profile.annualIncome,
        ':state': profile.state,
        ':caste': profile.caste,
        ':gender': profile.gender,
        ':occupation': profile.occupation,
        ':owns_land': profile.ownsLand ? 1 : 0,
        ':land_acres': profile.landAcres || 0,
        ':is_student': profile.isStudent ? 1 : 0,
        ':created_at': now,
        ':updated_at': now,
      }
    );
  }

  // Audit log entry
  dbInstance.run(
    'INSERT INTO user_entries (email, action_type, details, timestamp) VALUES (:email, :action_type, :details, :timestamp)',
    {
      ':email': email,
      ':action_type': 'PROFILE_SETUP',
      ':details': JSON.stringify({ ...profile, timestamp: now }),
      ':timestamp': now,
    }
  );

  saveToDisk();

  const fetchStmt = dbInstance.prepare('SELECT * FROM user_profiles WHERE email = :email');
  fetchStmt.bind({ ':email': email });
  fetchStmt.step();
  const savedProfile = fetchStmt.getAsObject() as unknown as DbUserProfile;
  fetchStmt.free();

  printProfileEventToTerminal(savedProfile);
  return savedProfile;
}

/**
 * Gets a user profile by email
 */
export async function getUserProfile(email: string): Promise<DbUserProfile | undefined> {
  await initSqliteDb();
  if (!dbInstance) return undefined;

  const stmt = dbInstance.prepare('SELECT * FROM user_profiles WHERE email = :email');
  stmt.bind({ ':email': email.trim().toLowerCase() });
  const hasRow = stmt.step();
  const profile = hasRow ? (stmt.getAsObject() as unknown as DbUserProfile) : undefined;
  stmt.free();
  return profile;
}

/**
 * Summary for inspection
 */
export async function getSqliteDatabaseSummary() {
  await initSqliteDb();
  if (!dbInstance) {
    return {
      databasePath: DB_PATH,
      counts: { users: 0, profiles: 0, entries: 0 },
      users: [],
      profiles: [],
      recentEntries: [],
    };
  }

  const userRes = dbInstance.exec('SELECT id, name, email, created_at, last_login_at FROM users ORDER BY id DESC');
  const profRes = dbInstance.exec('SELECT * FROM user_profiles ORDER BY id DESC');
  const entryRes = dbInstance.exec('SELECT * FROM user_entries ORDER BY id DESC LIMIT 50');

  const users: DbUser[] = (userRes.length > 0 && userRes[0].values)
    ? userRes[0].values.map((v) => ({
        id: Number(v[0]),
        name: String(v[1]),
        email: String(v[2]),
        created_at: String(v[3]),
        last_login_at: String(v[4]),
      }))
    : [];

  const profiles: DbUserProfile[] = (profRes.length > 0 && profRes[0].values)
    ? profRes[0].values.map((v) => ({
        id: Number(v[0]),
        user_id: v[1] ? Number(v[1]) : null,
        name: String(v[2]),
        email: String(v[3]),
        age: Number(v[4]),
        annual_income: Number(v[5]),
        state: String(v[6]),
        caste: String(v[7]),
        gender: String(v[8]),
        occupation: String(v[9]),
        owns_land: Number(v[10]),
        land_acres: Number(v[11]),
        is_student: Number(v[12]),
        has_completed_profile: Number(v[13]),
        created_at: String(v[14]),
        updated_at: String(v[15]),
      }))
    : [];

  const recentEntries: DbUserEntry[] = (entryRes.length > 0 && entryRes[0].values)
    ? entryRes[0].values.map((v) => ({
        id: Number(v[0]),
        email: String(v[1]),
        action_type: String(v[2]),
        details: String(v[3]),
        timestamp: String(v[4]),
      }))
    : [];

  return {
    databasePath: DB_PATH,
    counts: {
      users: users.length,
      profiles: profiles.length,
      entries: recentEntries.length,
    },
    users,
    profiles,
    recentEntries,
  };
}

/**
 * Terminal printers
 */
function printUserEventToTerminal(info: {
  eventType: string;
  email: string;
  name: string;
  timestamp: string;
  databaseId: number;
}) {
  const line = '═'.repeat(76);
  console.log(`\n${line}`);
  console.log(`📥 [SQLITE ENTRY STORED] » ${info.eventType}`);
  console.log(`  Table:        users & user_entries`);
  console.log(`  User ID:      #${info.databaseId}`);
  console.log(`  Citizen Name: ${info.name}`);
  console.log(`  Email:        ${info.email}`);
  console.log(`  Action Time:  ${info.timestamp}`);
  console.log(`  Database:     ${DB_PATH}`);
  console.log(`${line}\n`);
}

function printProfileEventToTerminal(profile: DbUserProfile) {
  const line = '═'.repeat(76);
  const formattedIncome = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(profile.annual_income);

  console.log(`\n${line}`);
  console.log(`📋 [SQLITE PROFILE SETUP STORED] » CITIZEN PROFILE SAVED`);
  console.log(`  Table:             user_profiles & user_entries`);
  console.log(`  Citizen Name:      ${profile.name}`);
  console.log(`  Email:             ${profile.email}`);
  console.log(`  Age:               ${profile.age} years`);
  console.log(`  Gender:            ${profile.gender}`);
  console.log(`  Social Category:   ${profile.caste}`);
  console.log(`  State / Region:    ${profile.state}`);
  console.log(`  Occupation:        ${profile.occupation}`);
  console.log(`  Annual Income:     ${formattedIncome}`);
  console.log(`  Land Ownership:    ${profile.owns_land ? `Yes (${profile.land_acres} acres)` : 'No'}`);
  console.log(`  Student Status:    ${profile.is_student ? 'Enrolled Student' : 'Not a Student'}`);
  console.log(`  Updated At:        ${profile.updated_at}`);
  console.log(`  Database File:     ${DB_PATH}`);
  console.log(`${line}\n`);
}

export async function printDatabaseStateToTerminal(triggerReason: string) {
  try {
    const summary = await getSqliteDatabaseSummary();
    const line = '═'.repeat(76);
    console.log(`\n${line}`);
    console.log(`🗄️  SQLITE DATABASE SNAPSHOT [${triggerReason}]`);
    console.log(`📁 File: ${DB_PATH}`);
    console.log(`📊 Total Users: ${summary.counts.users} | Total Profiles: ${summary.counts.profiles} | Total Audit Entries: ${summary.counts.entries}`);
    
    if (summary.users.length > 0) {
      console.log(`\n--- 👥 Registered Users (${summary.users.length}) ---`);
      summary.users.forEach((u) => {
        console.log(`  • [#${u.id}] ${u.name} <${u.email}> (Last Login: ${u.last_login_at})`);
      });
    }

    if (summary.profiles.length > 0) {
      console.log(`\n--- 📋 Configured Citizen Profiles (${summary.profiles.length}) ---`);
      summary.profiles.forEach((p) => {
        console.log(
          `  • ${p.name} | ${p.age}y, ${p.gender}, ${p.caste} | ${p.occupation}, ${p.state} | ₹${p.annual_income}/yr`
        );
      });
    }

    if (summary.users.length === 0 && summary.profiles.length === 0) {
      console.log('  (SQLite ready. Log in or configure a profile in UI to store entries)');
    }
    console.log(`${line}\n`);
  } catch (err) {
    console.error('Error printing SQLite database snapshot:', err);
  }
}
