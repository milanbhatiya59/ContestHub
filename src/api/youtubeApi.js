import apiClient from "./apiClient";

const getPlaylistVideos = async (selectedPlaylist) => {
  try {
    const res = await apiClient.get(`/videos/${selectedPlaylist}`);
    return res.data.data;
  } catch (error) {
    throw new Error("Error while videos." + error.message);
  }
};

export { getPlaylistVideos };
