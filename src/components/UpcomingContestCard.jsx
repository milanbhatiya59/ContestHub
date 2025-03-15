import { useEffect, useState } from "react";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";

const getPlatformIcon = (platform) => {
  switch (platform) {
    case "CodeChef":
      return (
        <SiCodechef className="text-2xl text-orange-600 dark:text-orange-400" />
      );
    case "Codeforces":
      return (
        <SiCodeforces className="text-2xl text-blue-600 dark:text-blue-400" />
      );
    case "LeetCode":
      return (
        <SiLeetcode className="text-2xl text-yellow-600 dark:text-yellow-400" />
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

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

const UpcomingContestCard = ({ platform, name, start_time, duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(start_time)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(start_time));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [start_time]);

  return (
    <tr className="border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
      <td className="p-4 flex items-center space-x-3">
        {getPlatformIcon(platform)}
        <span className="font-medium">{name}</span>
      </td>
      <td className="p-4">{start_time}</td>
      <td className="p-4">{duration} min</td>
      <td className="p-4 font-semibold">{timeRemaining}</td>
    </tr>
  );
};

export default UpcomingContestCard;
