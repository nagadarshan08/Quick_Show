import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dummyBookingData } from "../assets/assets";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ FIXED FUNCTION
  const getMyBookings = async () => {
    const savedBooking = JSON.parse(localStorage.getItem("booking"));

    if (savedBooking) {
      setBookings([savedBooking]); // latest booking
    } else {
      setBookings(dummyBookingData); // fallback
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] text-white">
      
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />

      <h1 className="text-xl font-semibold mb-6">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-red-500/10 border border-red-500/20 rounded-lg mt-4 p-4 max-w-3xl"
        >
          {/* LEFT */}
          <div className="flex flex-col md:flex-row">
            <img
              src={item?.show?.movie?.poster_path}
              alt="movie"
              className="md:max-w-45 aspect-video object-cover rounded"
            />

            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">
                {item?.show?.movie?.title || "No Title"}
              </p>

              <p className="text-gray-400 text-sm">
                {item?.show?.movie?.runtime
                  ? timeFormat(item.show.movie.runtime)
                  : "N/A"}
              </p>

              <p className="text-gray-400 text-sm mt-auto">
                {item?.show?.showDateTime
                  ? dateFormat(item.show.showDateTime)
                  : "No Date"}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold mb-3">
                {currency}
                {item?.amount || 0}
              </p>

              {!item?.isPaid && (
                <button className="bg-red-500 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer text-white hover:bg-red-600">
                  Pay Now
                </button>
              )}
            </div>

            <div className="text-sm">
              <p>
                <span className="text-gray-400">
                  Total Tickets:
                </span>{" "}
                {item?.bookedSeats?.length || 0}
              </p>

              <p>
                <span className="text-gray-400">
                  Seat Number:
                </span>{" "}
                {item?.bookedSeats?.join(", ") || "N/A"}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;