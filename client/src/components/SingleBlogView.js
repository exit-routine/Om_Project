import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SinglePost() {
  const { id } = useParams(); //Used to extract the Id of specific Blog
  const navigate = useNavigate(); // Used to naviagte to GetBlog page after the post is deleted
  const [isDeleted, setIsDeleted] = useState(false); // Used to keep the status of the post
  //  is deleted or not
  const [post, setPost] = useState({});

  useEffect(() => {
    // To fetch the single Post only by providing Id
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  const deleteBlog = (postId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    // To delete the Post
    if (shouldDelete) {
      axios
        .delete(`http://localhost:3000/posts/${postId}`)
        .then((response) => {
          console.log("Post deleted:", response.data);
          setIsDeleted(true);
          // window.location.href = "/";
          // // window.alert("Post has been deleted.");
          setTimeout(() => {
            navigate("/", { state: { isDeleted: true } }); //After deleting Navigate to "/" path
          }, 1000);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  return (
    <div>
      <div className="title-block">
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
        <h1 className="title">Daily Blog</h1>
        <Link to={`/EditBlog/${post.id}`}>
          <button className="create-button" style={{ marginRight: "10px" }}>
            Edit
          </button>
        </Link>
      </div>
      {isDeleted && (
        <div>
          {/* The message is shown after the post is deleted successfully  */}
          <p>Post has been deleted.</p>
        </div>
      )}
      <div className="show-card">
        <div className="blog-card">
          <h1>{post.title}</h1>
          <br />
          {/* {post.description} <br /> */}
          {post.description && (
            <div 
              dangerouslySetInnerHTML={{
                __html: post.description.replace(/\n/g, "<br />"),
                // This takes the post.description string and replaces newline characters
                //  (\n) as it is entered in textarea
              }}
            />
          )}
        </div>
      </div>

      <button className="delete-button" onClick={() => deleteBlog(post.id)}>
        Delete
      </button>
    </div>
  );
}

export default SinglePost;
