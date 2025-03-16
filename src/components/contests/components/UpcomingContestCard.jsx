import { useEffect, useState } from "react";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const getPlatformIcon = (platform) => {
  switch (platform) {
    case "CodeChef":
      return (
        <SiCodechef className="text-lg sm:text-xl text-orange-500 dark:text-orange-400" />
      );
    case "Codeforces":
      return (
        <SiCodeforces className="text-lg sm:text-xl text-blue-500 dark:text-blue-400" />
      );
    case "LeetCode":
      return (
        <SiLeetcode className="text-lg sm:text-xl text-yellow-500 dark:text-yellow-400" />
      );
    default:
      return <span className="text-gray-900 dark:text-white">{platform}</span>;
  }
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const getTimeRemaining = (start_time) => {
  const startDate = new Date(start_time);
  const now = new Date();
  const diff = startDate - now;

  if (diff <= 0) return "Started";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return days > 0
    ? `${days}d ${hours}h`
    : hours > 0
    ? `${hours}h ${minutes}m`
    : `${minutes}m`;
};

const UpcomingContestCard = ({ contest, isBookmarked, onToggleBookmark }) => {
  return (
    <tr className="border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
      <td className="p-3 sm:p-4 flex items-center space-x-2">
        {getPlatformIcon(contest.platform)}
        <span className="font-medium">{contest.name}</span>
      </td>
      <td className="p-3 sm:p-4">{contest.start_time}</td>
      <td className="p-3 sm:p-4 text-center">
        {formatDuration(contest.duration)}
      </td>
      <td className="p-3 sm:p-4 text-center font-semibold">
        {getTimeRemaining(contest.start_time)}
      </td>
      <td className="p-3 sm:p-4 text-center">
        <button
          onClick={() => onToggleBookmark(contest._id)}
          className="text-xl"
        >
          {isBookmarked ? (
            <FaBookmark className="text-yellow-500" />
          ) : (
            <FaRegBookmark className="text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </td>
    </tr>
  );
};

export default UpcomingContestCard;
