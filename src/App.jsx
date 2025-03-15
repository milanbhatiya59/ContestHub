import "./App.css";
import Navbar from "./components/Navbar";
import UpcomingContests from "./components/UpcomingContests";

function App() {
  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="m-10 rounded-2xl">
        <div className="flex h-full">
          <UpcomingContests />
        </div>
      </div>
    </div>
  );
}

export default App;
