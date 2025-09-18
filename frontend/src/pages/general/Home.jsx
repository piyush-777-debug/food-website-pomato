import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiHeart, FiBookmark, FiMessageCircle, FiHome } from "react-icons/fi";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("saved")||"[]"));
  const videoRefs = useRef(new Map());

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        const data = response.data.foodItem;
        setVideos(Array.isArray(data) ? data : [data]);
      })
      .catch(() => setVideos([]));
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoRefs.current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [videos]);

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return; }
    videoRefs.current.set(id, el);
  };

  const toggleLike = (id) => {
    setLikes((p) => ({ ...p, [id]: !p[id] }));
  };

  const toggleSave = (item) => {
    setSaved((prev) => {
      const exists = prev.find((v) => v._id === item._id);
      const next = exists ? prev.filter((v) => v._id !== item._id) : [...prev, item];
      localStorage.setItem("saved", JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (id) => saved.some((v) => v._id === id);

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {Array.isArray(videos) && videos.map((item, index) => {
          const id = item?._id || item?.id || String(index);
          return (
            <section key={id} className="reel" role="listitem">
              <video
                ref={setVideoRef(id)}
                className="reel-video"
                src={item?.video}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
              />
              <div className="reel-overlay">
                <div className="reel-overlay-gradient" aria-hidden="true" />
                <div className="reel-content">
                  <p className="reel-description" title={item?.description}>
                    {item?.description}
                  </p>
                  <Link to={"/food-partner/" + (item?.foodpartner || "")} className="visit-btn">
                    visit store
                  </Link>
                </div>

                <div className="action-rail" aria-label="actions">
                  <button className="action" onClick={() => toggleLike(id)} aria-label="like">
                    <FiHeart style={{ color: likes[id] ? "#e74c3c" : "white" }} size={26} />
                    <span className="count">{likes[id] ? (item?.likes || 0) + 1 : (item?.likes || 0)}</span>
                  </button>

                  <button className="action" onClick={() => toggleSave(item)} aria-label="save">
                    <FiBookmark style={{ color: isSaved(id) ? "#e74c3c" : "white" }} size={26} />
                    <span className="count">{saved.length}</span>
                  </button>

                  <button className="action" aria-label="comments">
                    <FiMessageCircle size={26} />
                    <span className="count">{item?.commentsCount ?? 0}</span>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <Link to="/" className="nav-item active">
          <FiHome size={20} />
          <span>home</span>
        </Link>
        <Link to="/saved" className="nav-item">
          <FiBookmark size={20} />
          <span>saved</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;