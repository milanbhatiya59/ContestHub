import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-300 dark:bg-gray-700 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <div className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold transition-colors duration-300">
          Contest Hub
        </div>

        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
