const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "posgress",
  password: "12346",
  database: "peliculas",
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const result = await pool.query(`SELECT * FROM posts`);
  return result.rows;
};

const agregarPost = async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  const query = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(query, values);
  console.log("NUEVO REGISTRO:", result.rows[0]);
  res.status(201).json(result.rows[0]);
};

const eliminarPosts = async (id) => {
  const result = await pool.query(`DELETE FROM posts WHERE id =$1`, [id]);
  return result.rows;
};

const incrementarLikes = async (id) => {
  const query =
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes";
  const result = await pool.query(query, [id]);
  return result.rows[0].likes;
};

module.exports = {
  getPosts,
  agregarPost,
  eliminarPosts,
  incrementarLikes,
};
