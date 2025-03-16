import { useState, useEffect } from "react";
import { getPlaylistVideos } from "../../api/youtubeApi.js";

const playlists = ["codechef", "codeforces", "leetcode"];

const VideoTab = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedVideos = await getPlaylistVideos(selectedPlaylist);
        // Ensure proper mapping to expected structure
        const formattedVideos = fetchedVideos.map((video) => ({
          id: video.id,
          title: video.snippet?.title || "Untitled Video",
          thumbnail: video.snippet?.thumbnails?.medium?.url || "",
          videoUrl: `https://www.youtube.com/watch?v=${video.contentDetails?.videoId}`,
          publishedAt: new Date(
            video.snippet?.publishedAt
          ).toLocaleDateString(),
          description:
            video.snippet?.description?.split("\n")[0] ||
            "No description available.",
        }));

        setVideos(formattedVideos);
      } catch (err) {
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedPlaylist]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Playlist Selection Buttons */}
      <div className="flex space-x-2 mb-4">
        {playlists.map((playlist) => (
          <button
            key={playlist}
            className={`px-3 py-1 text-sm font-medium rounded-md shadow transition-all duration-300 ${
              selectedPlaylist === playlist
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedPlaylist(playlist)}
          >
            {playlist}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <p className="text-center text-gray-900 dark:text-white">
          Loading videos...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No videos available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3"
            >
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              </a>
              <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {video.publishedAt}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {video.description.length > 100
                  ? video.description.substring(0, 100) + "..."
                  : video.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoTab;
