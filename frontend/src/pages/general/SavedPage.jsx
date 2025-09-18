import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { FiHeart, FiBookmark, FiMessageCircle, FiHome, FiTrash2 } from "react-icons/fi";
import axios from "axios"; 

const SavedPage = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved") || "[]");
    setSavedVideos(saved);
  }, []);

  useEffect(() => {
    if (savedVideos.length === 0) return;
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
  }, [savedVideos]);

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return; }
    videoRefs.current.set(id, el);
  };

  const toggleLike = (id) => {
    setLikes((p) => ({ ...p, [id]: !p[id] }));
  };

  const removeSaved = (item) => {
    setSavedVideos((prev) => {
      const next = prev.filter((v) => v._id !== item._id);
      localStorage.setItem("saved", JSON.stringify(next));
      return next;
    });
  };

  const clearAllSaved = () => {
    setSavedVideos([]);
    localStorage.setItem("saved", JSON.stringify([]));
  };

  if (savedVideos.length === 0) {
    return (
      <div className="reels-page">
        <div className="empty-saved">
          <div className="empty-saved-content">
            <FiBookmark size={64} color="rgba(255,255,255,0.3)" className="icon-bookmark" />
            <h2>No Saved Videos</h2>
            <p>Videos you save will appear here</p>
            <Link to="/" className="back-to-home-btn">
              Browse Videos
            </Link>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <Link to="/" className="nav-item">
            <FiHome size={20} />
            <span>home</span>
          </Link>
          <Link to="/saved" className="nav-item active">
            <FiBookmark size={20} />
            <span>saved</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-page">
      {/* Header */}
      <div className="saved-header">
        <h1>Saved Videos</h1>
        <button className="clear-all-btn" onClick={clearAllSaved}>
          <FiTrash2 size={18} />
          Clear All
        </button>
      </div>

      <div className="reels-feed" role="list">
        {savedVideos.map((item, index) => {
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

                  <button className="action" onClick={() => removeSaved(item)} aria-label="remove from saved">
                    <FiTrash2 style={{ color: "#e74c3c" }} size={24} />
                    <span className="count">remove</span>
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
        <Link to="/home" className="nav-item">
          <FiHome size={20} />
          <span>home</span>
        </Link>
        <Link to="/saved" className="nav-item active">
          <FiBookmark size={20} />
          <span>saved</span>
        </Link>
      </div>
    </div>
  );
};

export default SavedPage;