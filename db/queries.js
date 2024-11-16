const pool = require("./pool");

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
}

module.exports = {
  getPosts,
};
