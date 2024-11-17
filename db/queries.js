const pool = require("./pool");

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function insertUser(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password],
  );
}

module.exports = {
  getPosts,
  insertUser,
  getUserByUsername,
};
