import "./App.css";
import Navbar from "./components/Navbar";
import UpcomingContests from "./components/UpcomingContests";
import PastContests from "./components/PastContests";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upcoming Contests Section */}
        <section className="mb-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 sm:p-6">
            <UpcomingContests />
          </div>
        </section>

        <section>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 sm:p-6">
            <PastContests />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
