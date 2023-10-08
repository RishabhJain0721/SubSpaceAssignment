import express from "express";
import cors from "cors";
import routes from "./routes/blogs.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});