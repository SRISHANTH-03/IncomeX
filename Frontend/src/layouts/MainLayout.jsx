import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto px-8 py-6 sm:px-8 lg:px-10 lg:py-10">
          <div className="max-w-6xl mx-auto w-full space-y-12">{children}</div>
        </main>

      </div>

    </div>
  );
};

export default MainLayout;