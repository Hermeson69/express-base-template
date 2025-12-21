import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`HTTP server running on http://localhost:${port}`);
});