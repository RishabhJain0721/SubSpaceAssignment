import express from "express";
import _ from "lodash";
import { getBlogStats, getFilteredBlogs } from "../controllers/blogs.js";

const router = express.Router();

router.get("/blog-stats", async (req, res) => {
  try {
    const blogStats = await getBlogStats();
    res.json(blogStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching blog data." });
  }
});

router.get("/blog-search", async (req, res) => {
  const searchTerm = req.query.query;
  try {
    const filteredBlogs = await getFilteredBlogs(searchTerm);
    res.json(filteredBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching blog data." });
  }
});

export default router;
