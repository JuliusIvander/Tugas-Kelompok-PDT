import axios from "axios";
import authHeader from "./authHeader.js";
import jwtPayload from "./tokenService.js";

const API_URL = "http://localhost:3000/api/test/";
const userId = jwtPayload().userId;

class userService {
  getUserBlog() {
    return axios.get(API_URL + "getUserBlog", {
      headers: authHeader(),
      params: {
        userId: userId,
      },
    });
  }

  createBlog(blog) {
    var data = {
      title: blog.title,
      category_name: blog.category_name,
      content: blog.content,
      user_id: userId,
    };

    return axios.post(API_URL + "create_blog", data, {
      headers: authHeader(),
    });
  }
}

export default new userService();
