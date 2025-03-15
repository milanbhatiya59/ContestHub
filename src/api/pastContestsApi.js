import apiClient from "./apiClient";

const getPastContests = async () => {
  try {
    const res = await apiClient.get("/past-contests");
    const contests = res.data.data;

    contests.sort((a, b) => {
      return new Date(b.start_time) - new Date(a.start_time);
    });

    return contests;
  } catch (error) {
    throw new Error("Error while fetching past contests." + error.message);
  }
};

export { getPastContests };
