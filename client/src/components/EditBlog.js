import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditPost() {
  const { id } = useParams(); // To extract the blog id from the url
  const [postData, setPostData] = useState({}); // to store the data to be update in existing post
  const [isEdited, setIsEdited] = useState(false); // To track the status of post is edited 
  const [titleError, setTitleError] = useState(""); // to display title and description errors if any
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    //to fetch the data of particular post
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  // Update the current data 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };


  // Validating the title and description fields
  const validateForm = () => {
    let isValid = true;
    setTitleError("");
    setDescriptionError("");

    if (postData.title.length < 5) {
      setTitleError("Title must be at least 20 characters.");
      isValid = false;
    }

    if (postData.description.length < 20) {
      setDescriptionError("Description must be at least 20 characters.");
      isValid = false;
    }

    return isValid;
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const shouldUpdate = window.confirm(
        "Are you sure you want to Update this post?"
      );

      if (shouldUpdate) {
        // Make a Put request to update the post
        axios
          .put(`http://localhost:3000/posts/${id}`, postData)
          .then((response) => {
            setIsEdited(true);

            setTimeout(() => {
              // If edited will navigate to "/"
              navigate("/", { state: { isEdited: true } });
            }, 2000);
          })
          .catch((error) => {
            console.error("Error updating post:", error);
          });
      }
    }
  };

  // Displaying Content Starts here

  return (
    <div>
      <Navbar />
      <div >
        <h1>Edit Blog</h1>
      </div>

      {isEdited && (
        <div>
          <p>Post has been updated.</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="edit-form-container">
          <div className="card">
            <div className="field">
              <label className="card-label">Title:</label>
              <textarea
                type="text"
                name="title"
                className="edit-card-input-title edit-blog-title"
                value={postData.title || ""}
                onChange={handleInputChange}
              />
               <p className="error-message">{titleError}</p>
            </div>
            <div className="field">
              <label className="card-label">Description:</label>
              <textarea
                name="description"
                className="card-input-desc edit-blog-desc"
                value={postData.description || ""}
                onChange={handleInputChange} 
              />
               <p className="error-message">{descriptionError}</p>
            </div>
          </div>
        </div>

        <button type="submit" className="update-button">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
