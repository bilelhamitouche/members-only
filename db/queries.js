const pool = require("./pool");

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = ($1)",
    [username],
  );
  return rows[0];
}

async function insertUser(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password],
  );
}

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function insertPost(title, text, author) {
  await pool.query(
    "INSERT INTO posts (title, text, date, author) VALUES ($1, $2, NOW(), $3)",
    [title, text, author],
  );
}

async function becomeMember(id) {
  await pool.query("UPDATE users SET member = true WHERE id = ($1)", [id]);
}

async function becomeAdmin(id) {
  await pool.query("UPDATE users SET admin = true WHERE id = ($1)", [id]);
}

async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE id = ($1)", [id]);
}

module.exports = {
  getPosts,
  getUserById,
  getUserByUsername,
  insertUser,
  getPosts,
  insertPost,
  becomeMember,
  becomeAdmin,
  deletePost,
};
