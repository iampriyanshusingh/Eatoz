import React from "react";

const Home = () => {
  const videos = [
    {
      id: 1,
      src: "https://ik.imagekit.io/du6bzazvo/8dda08b0-b1d9-46f7-ba88-c9e8093a2892_EiJnhTYWB",
      description:
        "This is a sample video description that should be truncated to two lines if it's longer than that. This is additional text to make it longer.",
      storeLink: "#",
    },
    {
      id: 2,
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      description: "Another video with a short description.",
      storeLink: "#",
    },
    {
      id: 3,
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      description:
        "Third video description here, making sure it's truncated properly when it exceeds two lines of text in the UI.",
      storeLink: "#",
    },
    {
      id: 4,
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
      description: "Fourth video, keep it simple.",
      storeLink: "#",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
          }}
        >
          <video
            src={video.src}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            controls
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px",
              color: "white",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          >
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "10px",
                lineHeight: "1.4",
              }}
            >
              {video.description}
            </p>
            <button
              style={{
                padding: "10px 20px",
                background: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Visit Store
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
