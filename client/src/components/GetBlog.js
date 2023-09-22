import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Style.css";
import { formatDistanceToNow, parseISO } from "date-fns";

function PostList() {
  const [posts, setPosts] = useState([]); // To store the list of Posts retrieved
  const postCount = posts.length;

  // To get the all Posts
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // To convert the rails Date format to Days Ago format
  const formatToDaysAgo = (createdAt) => {
    const createdAtDate = parseISO(createdAt);
    return formatDistanceToNow(createdAtDate, { addSuffix: true });
  };

  // To Display some part of Post Description
  const truncateDescription = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div >
    <div style={{ height: "100vh" }}>
      <div className="title-block">
        <h1 className="title">DailyBlog</h1>

        <div style={{ marginRight: "10px" }}>
          {postCount > 0 && (
            <Link to="/PostBlog">
              <button className="create-button">+ Add</button>
            </Link>
          )}
        </div>
      </div>
      <div className="post-list">
        {/* If there are No post  */ }
        {postCount === 0 ? (
          <div className="no-post-container">
            <p>
              No posts yet <br />
              Be the first to post
            </p>
            <Link to="/PostBlog">
              <button className="add-button">+ Add</button>
            </Link> 
          </div>
        ) : (
          // If we have any posts
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h1 className="blog-title">{post.title}</h1>

              <p className="blog-desc">
                {truncateDescription(post.description, 20)}
              </p>

              <Link to={`/SingleBlogView/${post.id}`} className="custom-link">
                Read More
              </Link>
              <p
                style={{
                  textAlign: "right",
                  marginBottom: "2px",
                  fontStyle: "italic",
                  fontSize: "13px",
                }}
              >
                Posted {formatToDaysAgo(post.created_at)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default PostList;
