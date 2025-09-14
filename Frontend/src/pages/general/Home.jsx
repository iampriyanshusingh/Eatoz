import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Autoplay behavior is handled inside ReelFeed

  useEffect(() => {
    axios
      .get("/api/food", { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        setVideos(response.data.foodItems);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        /* noop: optionally handle error */
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/user/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/user/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Using local refs within ReelFeed; keeping map here for dependency parity if needed

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.like) {
        console.log("Video liked");
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
          )
        );
      } else {
        console.log("Video unliked");
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
          )
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
      // Optionally show user error message
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post(
        "/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v
          )
        );
      }
    } catch (error) {
      console.error("Error saving video:", error);
      // Optionally show user error message
    }
  }

  return (
    <div>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="logout-button"
          style={{
            position: "fixed",
            top: "10px",
            left: "87%",
            transform: "translateX(-50%)",
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Logout
        </button>
      )}
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />
    </div>
  );
};

export default Home;
