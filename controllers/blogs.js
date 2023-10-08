import axios from "axios";
import _ from "lodash";

const fetchBlogs = async () => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const getBlogStats = async () => {
  const allBlogs = await fetchBlogs();

  // Calculate blog statistics
  const totalBlogs = _.size(allBlogs);
  const longestTitle = _.maxBy(allBlogs, "title.length");
  const blogsWithPrivacy = _.filter(allBlogs, (blog) =>
    _.includes(_.toLower(blog.title), "privacy")
  );
  const numberOfBlogsWithPrivacy = _.size(blogsWithPrivacy);
  const uniqueTitles = _.uniqBy(allBlogs, "title");

  // JSON object containing the above data
  return {
    totalBlogs,
    longestTitle,
    numberOfBlogsWithPrivacy,
    uniqueTitles,
  };
};

export const getFilteredBlogs = async (searchTerm) => {
  const allBlogs = await fetchBlogs();
  return _.filter(allBlogs, (blog) =>
    _.includes(_.toLower(blog.title), searchTerm)
  );
};
