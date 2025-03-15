import { useEffect, useState } from "react";
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

const getTimeRemaining = (start_time) => {
  const startDate = new Date(start_time);
  const now = new Date();
  const diff = startDate - now;

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

// Truncate contest name if it's too long (max 40 characters)
const truncateText = (text, length = 40) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const UpcomingContestCard = ({ platform, name, start_time, duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(start_time)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(start_time));
    }, 60000);
    return () => clearInterval(interval);
  }, [start_time]);

  return (
    <tr className="border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
      {/* Contest Name (with Platform Icon) */}
      <td className="p-3 sm:p-4 flex items-center space-x-2 w-full">
        {getPlatformIcon(platform)}
        <span className="font-medium">{truncateText(name)}</span>
      </td>

      {/* Start Time */}
      <td className="p-3 sm:p-4 w-[25%]">{start_time}</td>

      {/* Duration (Reduced width) */}
      <td className="p-3 sm:p-4 w-[15%] text-center">
        {formatDuration(duration)}
      </td>

      {/* Time Remaining (Reduced width) */}
      <td className="p-3 sm:p-4 w-[15%] text-center font-semibold">
        {timeRemaining}
      </td>
    </tr>
  );
};

export default UpcomingContestCard;
