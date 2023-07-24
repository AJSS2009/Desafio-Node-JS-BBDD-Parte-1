const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const {
  getPosts,
  agregarPost,
  eliminarPosts,
  incrementarLikes,
} = require("./consultas");

app.listen(3001, console.log(`SERVIDOR EN EL PUERTO: ${port}`));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "../front/public/index.html");
});

app.get("/posts", async (req, res) => {
  try {
    const get = await getPosts();
    res.json(get);
  } catch (error) {
    console.error("ERROR AL OBTENER LOS POSTS:", error);
    res.status(500).send("ERROR EN EL SERVIDOR");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const posts = await agregarPost(req, res);
    res.json(posts);
  } catch (error) {
    console.error("ERROR PARA OBTENER LOS POSTS:", error);
    res.status(500).send("ERROR EN EL SERVIDOR");
  }
});

// BORRAR LOS POSTS
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await eliminarPosts(id);
  res.send(result);
});

// INCREMENTAR LIKES
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const likes = await incrementarLikes(id);
    res.json({ success: true, likes });
  } catch (error) {
    console.error("ERROR AL PROCESAR SOLICITUD:", error);
    res.status(500).json({ error: "ERROR PARA LA SOLICITUD" });
  }
});
