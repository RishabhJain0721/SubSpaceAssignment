import express from "express";
import axios from "axios";
import cors from "cors";
import _ from "lodash";

const app = express();
app.use(cors());

app.get("/api/blog-stats", async (req, res) => {
  try {
    // Make the cURL request to fetch blog data
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    // Extracting the blog data from the response
    const blogData = response.data;
    // Sending the response with blog data
    res.json(blogData);
  } catch (error) {
    // Handling any errors that occur during the request
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching blog data." });
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));