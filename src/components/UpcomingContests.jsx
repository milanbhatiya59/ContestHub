import { useState, useEffect } from "react";
import UpcomingContestCard from "./UpcomingContestCard";
import { getUpcomingContests } from "../api/upcomingContestsApi";

const SkeletonLoader = () => (
  <tbody>
    {[...Array(3)].map((_, index) => (
      <tr
        key={index}
        className="border-b border-gray-300 dark:border-gray-600 animate-pulse"
      >
        <td className="p-4">
          <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </td>
        <td className="p-4">
          <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </td>
        <td className="p-4">
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </td>
        <td className="p-4">
          <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </td>
      </tr>
    ))}
  </tbody>
);

const UpcomingContests = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingContests = async () => {
      try {
        const contestData = await getUpcomingContests();
        setContests(contestData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingContests();
  }, []);

  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Upcoming Contests
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg">
          <thead className="bg-gray-300 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Time Remaining</th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <tbody>
              {contests.length > 0 ? (
                contests.map((contest, index) => (
                  <UpcomingContestCard
                    key={index}
                    platform={contest.platform}
                    name={contest.name}
                    start_time={contest.start_time}
                    duration={contest.duration}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No upcoming contests available.
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
