import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

class blogService {
  getAllBlog() {
    return axios.get(API_URL + "getBlog");
  }

  getBlogById(id) {
    return axios.get(API_URL + "getBlog/" + id);
  }
}

export default new blogService();
