import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) return setVideoURL("");
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return setVideoFile(null), setFileError("");
    if (!file.type.startsWith("video/"))
      return setFileError("Please select a valid video file.");
    setFileError("");
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/"))
      return setFileError("Please drop a valid video file.");
    setFileError("");
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name, videoFile]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
            Create New Food
          </h1>
          <p className="text-gray-400 mt-3 text-base">
            Upload a short food video, give it a catchy name and description, then save.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: Upload & Preview */}
          <section className="relative bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 shadow-2xl rounded-3xl p-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Food Video
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="sr-only"
            />

            {!videoFile && (
              <div
                role="button"
                tabIndex={0}
                onClick={openFileDialog}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openFileDialog();
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="rounded-2xl border-2 border-dashed border-gray-700 hover:border-blue-500/70 
                           focus:outline-none focus:ring-2 focus:ring-blue-600/60
                           bg-gray-900/30 flex flex-col items-center justify-center px-6 py-14 text-center 
                           cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <svg
                  className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="2" d="M12 5v14m7-7H5" />
                </svg>
                <p className="mt-4 text-sm">
                  <span className="font-medium text-blue-400">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV • up to 100MB</p>
              </div>
            )}

            {fileError && <p className="mt-3 text-sm text-red-400">{fileError}</p>}

            {videoFile && (
              <div className="mt-6 space-y-5">
                {/* File Info */}
                <div className="flex items-center justify-between rounded-xl bg-gray-800/60 px-4 py-3 text-sm shadow-inner">
                  <span className="truncate">{videoFile.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={openFileDialog}
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => {
                        setVideoFile(null);
                        setFileError("");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Video Preview */}
                {videoURL && (
                  <div className="relative">
                    <video
                      src={videoURL}
                      controls
                      className="w-full rounded-2xl border border-gray-800/80 shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/20 pointer-events-none" />
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Right: Form */}
          <form
            onSubmit={onSubmit}
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 rounded-3xl shadow-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-300">
                Name
              </label>
              <input
                type="text"
                placeholder="e.g., Spicy Paneer Wrap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-gray-700 bg-black/50 px-4 py-3 text-sm placeholder-gray-500
                           focus:border-transparent focus:ring-2 focus:ring-blue-600/70 transition"
              />
              <p className="mt-1 text-xs text-gray-500">Keep it short and catchy (2–5 words).</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Ingredients, taste, spice level, serving tips..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-700 bg-black/50 px-4 py-3 text-sm placeholder-gray-500
                           focus:border-transparent focus:ring-2 focus:ring-purple-600/70 transition"
              />
              <p className="mt-1 text-xs text-gray-500">Write something that excites the viewer!</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                           transition-all ${
                             isDisabled
                               ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                               : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-600/60"
                           }`}
              >
                Save Food 🚀
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
