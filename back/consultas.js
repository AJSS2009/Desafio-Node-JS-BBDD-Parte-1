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
  try {
    const { titulo, img, descripcion, likes } = req.body;
    const query = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(query, values);
    console.log("NUEVO REGISTRO:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERROR AL AGREGAR POST:", error);
    res.status(500).json({ error: "Error al agregar el post" });
  }
};

const eliminarPosts = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM posts WHERE id =$1`, [id]);
    return result.rows;
  } catch (error) {
    console.error("ERROR AL ELIMINAR POST:", error);
    throw error;
  }
};

const incrementarLikes = async (id) => {
  try {
    const query =
      "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes";
    const result = await pool.query(query, [id]);
    return result.rows[0].likes;
  } catch (error) {
    console.error("ERROR AL INCREMENTAR LIKE:", error);
    throw error;
  }
};

module.exports = {
  getPosts,
  agregarPost,
  eliminarPosts,
  incrementarLikes,
};