import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { dummyShowsData } from "../../assets/assets";

const ListShows = () => {
  

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDataTime: "2025-06-30T02:30:00.000Z",
          showPrice: 50,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
        {
          movie: dummyShowsData[0],
          showDataTime: "2025-06-30T02:30:00.000Z",
          showPrice: 50,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
            D1: "user_4",
          },
        },
        {
          movie: dummyShowsData[0],
          showDataTime: "2025-06-30T02:30:00.000Z",
          showPrice: 50,
          occupiedSeats: {
            A1: "user_1",
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b0f] to-[#1a0b0f] p-10 text-white">
      
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">
        List{" "}
        <span className="text-red-500 underline underline-offset-4">
          Shows
        </span>
      </h1>

      {/* Table (LEFT ALIGNED) */}
      <div className="mt-6">
        <div className="w-[800px] rounded-2xl overflow-hidden border border-red-900/30 bg-gradient-to-br from-[#2a0f14] to-[#120608] shadow-lg">

          {/* Header */}
          <div className="grid grid-cols-4 px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-red-800/60 to-red-900/20">
            <p>Movie Name</p>
            <p>Show Time</p>
            <p>Total Booking</p>
            <p>Earnings</p>
          </div>

          {/* Rows */}
          {shows.map((show, index) => (
            <div
              key={index}
              className="grid grid-cols-4 px-6 py-4 text-sm text-gray-300 border-t border-red-900/20 hover:bg-red-900/10 transition"
            >
              <p className="text-white font-medium">
                {show.movie?.title || "No Title"}
              </p>

              <p>
                {new Date(show.showDataTime).toLocaleString()}
              </p>

              <p>
                {Object.keys(show.occupiedSeats).length}
              </p>

              <p className="text-red-400 font-semibold">
                ${" "}
                {Object.keys(show.occupiedSeats).length * show.showPrice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListShows;