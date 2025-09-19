import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiMail, FiHeart, FiUsers, FiVideo } from "react-icons/fi";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://food-website-pomato-server.vercel.app/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FiUsers className="text-red-400 text-2xl" />
          </div>
          <p className="text-red-400 text-xl font-medium mb-2">Profile not found</p>
          <p className="text-white/50 mb-6 text-sm">This food partner doesn't exist or has been removed</p>
          <button 
            onClick={() => navigate('/')}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleVideoPlay = (videoElement) => {
    const allVideos = document.querySelectorAll(".profile-video");
    allVideos.forEach((video) => {
      if (video !== videoElement) video.pause();
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm"
          >
            <FiArrowLeft size={18} />
            <span>Back</span>
          </button>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop"
              alt={profile.fullname}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.fullname}</h2>
            <div className="mt-2 space-y-1 text-white/70 text-sm">
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <FiMapPin size={14} /> {profile.address}
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <FiMail size={14} /> {profile.email}
              </p>
            </div>
            <div className="mt-4 flex gap-6 justify-center sm:justify-start text-sm">
              <div className="text-center">
                <div className="font-semibold">{videos.length}</div>
                <p className="text-white/50">Videos</p>
              </div>
              <div className="text-center">
                <div className="font-semibold">15.2K</div>
                <p className="text-white/50">Customers</p>
              </div>
              <div className="text-center">
                <div className="font-semibold">4.8</div>
                <p className="text-white/50">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="px-4 pb-12">
        <h3 className="text-lg font-semibold m-5 text-center">Featured Videos</h3>

        {videos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <video
                  className="profile-video w-full aspect-[9/16] object-cover"
                  muted
                  loop
                  playsInline
                  onPlay={(e) => handleVideoPlay(e.target)}
                >
                  <source src={video.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-sm font-medium truncate">{video.name || "Food Video"}</h4>
                  <p className="text-xs text-white/60 line-clamp-2">
                    {video.description || "Amazing food content"}
                  </p>
                </div>

                <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <FiHeart size={12} className="text-red-400" />
                  {Math.floor(Math.random() * 999) + 100}
                </div>

                {/* Tap to Play */}
                <button
                  className="absolute inset-0"
                  onClick={(e) => {
                    const videoEl = e.currentTarget.parentElement.querySelector("video");
                    if (videoEl.paused) {
                      handleVideoPlay(videoEl);
                      videoEl.play();
                    } else {
                      videoEl.pause();
                    }
                  }}
                  aria-label="Play video"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FiVideo className="mx-auto mb-3 text-white/30 text-3xl" />
            <p className="text-white/60">No videos yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
