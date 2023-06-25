import axios from 'axios';

const backendBaseUrl = 'https://favorite-movies-g64v.onrender.com'; 
const apiUrl = `${backendBaseUrl}/api/post`;

export default class API {

  // Fetch all Post
  static async getAllPost() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.forEach(post => {
        post.image = `${backendBaseUrl}/${post.image}`;
    });
    return data;
  }
  
  // Get post by Id
  static async getPostById(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    data.image = `${backendBaseUrl}/${data.image}`;

    return data;
  }

  // Add Post
  static async addPost(post) {
    return axios.post(`${apiUrl}`,post, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Update Post

  static async updatePost(id, post) {
    const res = await axios.patch(`${apiUrl}/${id}`, post);
    return res.data;
  }


  // delete post
  static async deletePost(id, post) {

    const res = await axios.delete(`${apiUrl}/${id}`, post);

    return res.data;
  }


}
