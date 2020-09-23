import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default function PostsFeed() {
  const [data, setData] = useState({
    loading: true,
    posts: [],
  });

  async function fetchNext5Posts() {
    const morePosts = await axios.get(
      `${API_URL}/posts?offset=${data.posts.length}&limit=5`
    );
    setData({
      loading: false,
      posts: [...data.posts, ...morePosts.data.rows],
    });
  }

  useEffect(() => {
    fetchNext5Posts();
  }, []);

  const posts = data.loading
    ? "Loading"
    : data.posts.map((post) => (
        <li key={post.id}>
          <h3 style={{ color: "red" }}>{post.title}</h3>
          <p>{post.content}</p>
          <br></br>
          <p>Post Date: {moment(post.createdAt).format("DD-MM-YYYY")}</p>
        </li>
      ));

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>
      {posts}
      <button onClick={fetchNext5Posts}>MORE POSTS</button>
    </div>
  );
}
