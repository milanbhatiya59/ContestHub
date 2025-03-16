import { useState, useEffect } from "react";
import UpcomingContestCard from "./UpcomingContestCard";
import { getUpcomingContests } from "../../../api/upcomingContestsApi";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";

const platformIcons = {
  CodeChef: (
    <SiCodechef className="text-lg sm:text-xl text-orange-500 dark:text-orange-400" />
  ),
  Codeforces: (
    <SiCodeforces className="text-lg sm:text-xl text-blue-500 dark:text-blue-400" />
  ),
  LeetCode: (
    <SiLeetcode className="text-lg sm:text-xl text-yellow-500 dark:text-yellow-400" />
  ),
};

const SkeletonLoader = () => (
  <tbody>
    {[...Array(3)].map((_, index) => (
      <tr
        key={index}
        className="border-b border-gray-300 dark:border-gray-600 animate-pulse"
      >
        {Array(5)
          .fill()
          .map((_, idx) => (
            <td key={idx} className="p-3 sm:p-4">
              <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
          ))}
      </tr>
    ))}
  </tbody>
);

const UpcomingContests = () => {
  const [contests, setContests] = useState([]);
  const [bookmarkedContests, setBookmarkedContests] = useState(new Set());
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingContests = async () => {
      try {
        const contestData = await getUpcomingContests();
        setContests(contestData);

        const uniquePlatforms = [
          ...new Set(contestData.map((contest) => contest.platform)),
        ];
        setSelectedPlatforms(uniquePlatforms);

        const storedBookmarks = new Set(
          JSON.parse(localStorage.getItem("bookmarkedContests")) || []
        );
        setBookmarkedContests(storedBookmarks);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingContests();
  }, []);

  const toggleBookmark = (contestId) => {
    const updatedBookmarks = new Set(bookmarkedContests);
    if (updatedBookmarks.has(contestId)) {
      updatedBookmarks.delete(contestId);
    } else {
      updatedBookmarks.add(contestId);
    }
    setBookmarkedContests(updatedBookmarks);
    localStorage.setItem(
      "bookmarkedContests",
      JSON.stringify([...updatedBookmarks])
    );
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredContests = contests.filter((contest) =>
    selectedPlatforms.includes(contest.platform)
  );

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Upcoming Contests
        </h1>

        <div className="space-y-1">
          <h1 className="text-sm flex items-center ml-2 font-bold text-gray-900 dark:text-white">
            Filter
          </h1>
          <div className="flex space-x-4">
            {Object.keys(platformIcons).map((platform) => (
              <label
                key={platform}
                className="flex items-center cursor-pointer space-x-2"
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                  className="hidden"
                />
                <div
                  className={`p-2 rounded-full transition-all ${
                    selectedPlatforms.includes(platform)
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {platformIcons[platform]}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg">
          <thead className="bg-gray-300 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3 sm:p-4 w-[35%]">Name</th>
              <th className="p-3 sm:p-4 w-[20%]">Start Time</th>
              <th className="p-3 sm:p-4 w-[15%] text-center">Duration</th>
              <th className="p-3 sm:p-4 w-[15%] text-center">Time Remaining</th>
              <th className="p-3 sm:p-4 w-[10%] text-center">Bookmark</th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <tbody>
              {filteredContests.length > 0 ? (
                filteredContests.map((contest) => (
                  <UpcomingContestCard
                    key={contest._id}
                    contest={contest}
                    isBookmarked={bookmarkedContests.has(contest._id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No contests available.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UpcomingContests;
