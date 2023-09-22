import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Style.css"; // Importing CSS file for styling

function PostForm() {
  const [title, setTitle] = useState(""); // Used to store the title enter by user
  const [description, setDescription] = useState(""); // Used to store the description enter by user
  const [titleError, setTitleError] = useState(""); // To store the title and description errors if any
  const [descriptionError, setDescriptionError] = useState("");
  const [isPosted, setIsPosted] = useState(false); // To track that the post is posted successfully
  const navigate = useNavigate(); // To navigate to other pages

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // To validate the form so that user should not post a blank post
  const validateForm = () => {
    let isValid = true;
    setTitleError("");
    setDescriptionError("");

    if (title.length < 5) {
      setTitleError("Title must be at least 20 characters.");
      isValid = false;
    }

    if (description.length < 20) {
      setDescriptionError("Description must be at least 20 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      title: title,
      description: description,
    };

    if (validateForm()) {
      //Making the post req to backend
      axios
        .post("http://localhost:3000/posts", newPost)
        .then((response) => {
          console.log("New post created:", response.data);
          setIsPosted(true);

          // if posted successfully navigate to "/" after some delay
          setTimeout(() => {
            navigate("/", { state: { isPosted: true } });
          }, 2000);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });

      setTitle("");
      setDescription("");
    }
  };

  // Displaying content starts here

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="title-block">
          <Link to="/">
            <button className="home-button">Home</button>
          </Link>
          <h1 className="title">DailyBlog</h1>

          <div>
            <button type="submit" className="add-post-button">
              Save
            </button>
          </div>
        </div>

        {isPosted && (
          <div style={{ paddingTop: "30px" }}>
            <p>Post has been added.</p>
          </div>
        )}
        <div className="form-container">
          <div className="card">
            <div className="field">
              <label className="card-label">Title:</label>
              <input
                className="card-input-title blog-desc"
                style={{
                  fontSize: "20px",
                }}
                placeholder="Enter title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
              <p className="error-message">{titleError}</p>
            </div>
            <div className="field">
              <label className="card-label ">Description:</label>
              <textarea
                placeholder="Enter description"
                className="card-input-desc blog-desc"
                style={{ fontSize: "20px" }}
                value={description}
                onChange={handleDescriptionChange}
              />
              <p className="error-message">{descriptionError}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
