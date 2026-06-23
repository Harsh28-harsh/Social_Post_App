import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [commentText, setCommentText] = useState("");

  const getPosts = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts/create", {
        text,
        image,
      });

      setText("");
      setImage("");

      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      await API.put(`/posts/like/${id}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (id) => {
    if (!commentText.trim()) return;

    try {
      await API.post(`/posts/comment/${id}`, {
        text: commentText,
      });

      setCommentText("");
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/delete/${id}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="feed-container">

        <h1 className="feed-title">
          Community Feed 🚀
        </h1>

        {/* Create Post */}

        <div className="create-post-card">
          <form onSubmit={createPost}>
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
            />

            <input
              type="text"
              placeholder="Image URL (Optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button
              type="submit"
              className="create-post-btn"
            >
              Create Post
            </button>
          </form>
        </div>

        {/* Posts */}

        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
          >
            <div className="post-header">

              <div className="avatar">
                {post.user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{post.user?.name}</h3>
                <span className="post-time">
                  Community Member
                </span>
              </div>

            </div>

            {post.text && (
              <p className="post-text">
                {post.text}
              </p>
            )}

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="post-image"
              />
            )}

            <div className="post-stats">
              <span>
                ❤️ {post.likes.length} Likes
              </span>

              <span>
                💬 {post.comments.length} Comments
              </span>
            </div>

            <div className="post-actions">

              <button
                className="like-btn"
                onClick={() => handleLike(post._id)}
              >
                ❤️ Like
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(post._id)}
              >
                🗑 Delete
              </button>

            </div>

            <div className="comments-section">

              <input
                type="text"
                className="comment-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
              />

              <button
                className="comment-btn"
                onClick={() => handleComment(post._id)}
              >
                Comment
              </button>

              {post.comments.length > 0 &&
                post.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="comment-box"
                  >
                    <strong>
                      {comment.username}
                    </strong>

                    <p>{comment.text}</p>
                  </div>
                ))}

            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default Feed;