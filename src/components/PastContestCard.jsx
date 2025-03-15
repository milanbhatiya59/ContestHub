import React from "react";
import { IoLink } from "react-icons/io5";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";

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

const truncateText = (text, length = 40) =>
  text.length > length ? `${text.substring(0, length)}...` : text;

const PastContestCard = ({ contest }) => {
  return (
    <tr className="border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
      <td className="p-3 sm:p-4 flex items-center space-x-2 w-full">
        {getPlatformIcon(contest.platform)}
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 font-medium hover:underline"
        >
          <span>{truncateText(contest.name)}</span>
          <IoLink className="text-lg sm:text-xl text-gray-400 dark:text-gray-300" />
        </a>
      </td>
      <td className="p-3 sm:p-4 w-[25%]">{contest.start_time}</td>
      <td className="p-3 sm:p-4 w-[15%] text-center">
        {Math.floor(contest.duration / 60)}h {contest.duration % 60}m
      </td>
      <td className="p-3 sm:p-4 w-[15%] text-center font-semibold">
        {contest.video_tutorial ? (
          <a
            href={contest.video_tutorial}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Watch
          </a>
        ) : (
          <span className="text-gray-500">N/A</span>
        )}
      </td>
    </tr>
  );
};

export default PastContestCard;
