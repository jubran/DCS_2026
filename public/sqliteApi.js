// sqliteApi.js – React‑side API using sql.js and bundled SQLite file in /public
// ------------------------------------------------------------------
//  • No Express / Node server required – runs entirely in browser
//  • Reads pre‑built dcs.sqlite3 and dcsVite.sqlite3 from /public
//  • Exposes equivalent functions to match original PHP API:
//      - fetchAuth(email, password)
//      - fetchData(email)
//      - getDcs()
//      - getDcsData()
//      - getEventsByDate(date)
// ------------------------------------------------------------------

import initSqlJs from 'sql.js';

let db = null;
let dcsViteDb = null;

// Utility to load SQLite file from /public folder
const loadDatabase = async (path) => {
  const res = await fetch(path);
  const buf = await res.arrayBuffer();

  const SQL = await initSqlJs({
    locateFile: file => `http://localhost:3030/sql-wasm.wasm`
  });

  return new SQL.Database(new Uint8Array(buf));
};

export const initDatabases = async () => {
  if (!db) db = await loadDatabase('/dcs.sqlite3');
  if (!dcsViteDb) dcsViteDb = await loadDatabase('/dcsVite.sqlite3');
};

const getSingleRow = (database, sql, params = []) => {
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const hasRow = stmt.step();
  return hasRow ? stmt.getAsObject() : null;
};

const getAllRows = (database, sql, params = []) => {
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  return rows;
};

export const fetchAuth = (email, password) => {
  if (!email || !password) throw new Error("Email and password are required");
  const user = getSingleRow(
    db,
    "SELECT id FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
  if (!user) throw new Error("Invalid email or password");
  return { user_id: user.id, accessToken: `mock-jwt-${user.id}` };
};

export const fetchData = (email) => {
  if (!email) throw new Error("Email is required");
  const user = getSingleRow(db, "SELECT password FROM users WHERE email = ?", [email]);
  return { data: user ? user.password : "Not Auth" };
};

export const getDcs = () => {
  const email = "jobran@hotmail.com";
  const user = getSingleRow(db, "SELECT password FROM users WHERE email = ?", [email]);
  return { dcsToday: user ? user.password : "Not Auth" };
};

export const getDcsData = () => {
  return getAllRows(dcsViteDb, "SELECT * FROM events WHERE date1 = '2021-12-26'");
};

export const getEventsByDate = (date) => {
  return getAllRows(dcsViteDb, "SELECT * FROM events WHERE date1 = ?", [date]);
};
