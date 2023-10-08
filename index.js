import express from "express";
import axios from "axios";
import cors from "cors";
import _ from "lodash";

const app = express();
app.use(cors());

const fetchBlogs = async () => {
  const response = await axios.get(
    "https://intent-kit-16.hasura.app/api/rest/blogs",
    {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    }
  );
  return response.data.blogs;
};

app.get("/api/blog-stats", async (req, res) => {
  try {
    fetchBlogs().then((allBlogs) => {
      // Total number of blogs
      const totalBlogs = _.size(allBlogs);

      // Blog with longest title
      const longestTitle = _.maxBy(allBlogs, "title.length");

      // Blogs logs with titles containing the word "privacy."
      const blogsWithPrivacy = _.filter(allBlogs, (blog) => {
        return _.includes(_.toLower(blog.title), "privacy");
      });
      const numberOfBlogsWithPrivacy = _.size(blogsWithPrivacy);

      // Array of unique blog titles (no duplicates).
      const uniqueTitles = _.uniqBy(allBlogs, "title");

      // JSON object containing the above data
      const blogStats = {
        totalBlogs,
        longestTitle,
        numberOfBlogsWithPrivacy,
        uniqueTitles,
      };

      // Sending the response with blog data
      res.json(blogStats);
    });
  } catch (error) {
    // Handling any errors that occur during the request
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching blog data." });
  }
});

app.get("/api/blog-search", (req, res) => {
  const searchTerm = req.query.query;
  try {
    const allBlogs = fetchBlogs().then((allBlogs) => {
      const filteredBlogs = _.filter(allBlogs, (blog) => {
        return _.includes(_.toLower(blog.title), searchTerm);
      });
      console.log(filteredBlogs);
      res.json(filteredBlogs);
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching blog data." });
  }
});
app.listen(8080, () => console.log("Server running on port 8080"));
