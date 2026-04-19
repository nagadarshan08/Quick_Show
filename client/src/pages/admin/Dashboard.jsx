import { useEffect, useState } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UserIcon,
} from "lucide-react";
import { dummyDashboardData } from "../../assets/assets";

const Dashboard = () => {
  const currency = "$";

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setDashboardData(dummyDashboardData);
  }, []);

  if (!dashboardData) {
    return (
      <div className="text-white text-center mt-10">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Movies",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser,
      icon: UserIcon,
    },
  ];

  return (
    <div className="relative text-white">

      {/* 🔴 Background Glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-red-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-500/10 blur-3xl rounded-full"></div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        Admin <span className="text-red-500">Dashboard</span>
      </h1>

      {/* 🔴 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-[#111] border border-red-600/30 p-5 rounded-xl flex justify-between items-center
              hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition"
            >
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <h2 className="text-xl font-bold">{card.value}</h2>
              </div>
              <Icon className="text-red-500 w-7 h-7" />
            </div>
          );
        })}
      </div>

      {/* 🎬 Active Movies */}
      <h2 className="text-xl font-semibold mb-4 text-red-500">
        Active Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {dashboardData.activeShows.map((show, index) => {
          const { movie, showPrice } = show;

          return (
            <div
              key={index}
              className="bg-[#111] rounded-xl overflow-hidden border border-red-600/20
              hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-[1.02] transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold">{movie.title}</h3>

                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-red-500 font-bold">
                    {currency}{showPrice}
                  </span>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Dashboard;