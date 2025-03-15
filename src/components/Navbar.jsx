import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <div className="w-screen h-16 bg-gray-300 dark:bg-gray-700 shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center h-full px-6">
        <div className="text-gray-900 dark:text-white text-xl font-bold transition-colors duration-300 pl-20">
          Contest Hub
        </div>
        <div className="flex items-center pr-6">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
