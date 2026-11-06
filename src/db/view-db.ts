import { initSqliteDb, printDatabaseStateToTerminal } from './sqlite.ts';

async function main() {
  await initSqliteDb();
  await printDatabaseStateToTerminal('CLI Command Run');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to view database:', err);
  process.exit(1);
});
