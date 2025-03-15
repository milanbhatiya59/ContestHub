import React, { useState, useEffect } from "react";
import { getPastContests } from "../api/pastContestsApi";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import PastContestCard from "./PastContestCard";

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
        {Array(4)
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

const PastContests = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 10;

  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const contestData = await getPastContests();
        setContests(contestData);
        const uniquePlatforms = [
          ...new Set(contestData.map((contest) => contest.platform)),
        ];
        setSelectedPlatforms(uniquePlatforms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPastContests();
  }, []);

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
    setCurrentPage(1);
  };

  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  const filteredContests = contests.filter((contest) =>
    selectedPlatforms.includes(contest.platform)
  );

  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = filteredContests.slice(
    indexOfFirstContest,
    indexOfLastContest
  );

  const totalPages = Math.ceil(filteredContests.length / contestsPerPage);

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Past Contests
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
              <th className="p-3 sm:p-4 w-[40%]">Name</th>
              <th className="p-3 sm:p-4 w-[20%]">Start Time</th>
              <th className="p-3 sm:p-4 w-[15%] text-center">Duration</th>
              <th className="p-3 sm:p-4 w-[15%] text-center">Tutorial</th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <tbody>
              {currentContests.length > 0 ? (
                currentContests.map((contest, index) => (
                  <PastContestCard key={index} contest={contest} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No contests available for the selected platforms.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white disabled:opacity-50 flex items-center"
        >
          <GrLinkPrevious className="mr-2" /> Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white disabled:opacity-50 flex items-center"
        >
          Next <GrLinkNext className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PastContests;
