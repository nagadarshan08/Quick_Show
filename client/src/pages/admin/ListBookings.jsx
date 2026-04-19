import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dummyBookingData } from "../../assets/assets";

const ListBookings = () => {
  

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  // ✅ Date format fix
  const formatDate = (date) => {
    if (!date) return "No Date";
    return new Date(date).toLocaleString();
  };

  // ✅ Seats format fix
  const formatSeats = (seatsObj) => {
    if (!seatsObj) return "No Seats";
    return Object.values(seatsObj).join(", ");
  };

  return !isLoading ? (
    <div className="px-6 py-6 w-full"> {/* ✅ SAME spacing as ListShows */}
      
      {/* Title */}
      <Title text1="List" text2="Bookings" />

      {/* Table Container */}
      <div className="mt-6 w-full max-w-4xl">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-red-900 to-red-800 text-left text-white">
              <th className="p-3 pl-6 font-medium">User Name</th>
              <th className="p-3 font-medium">Movie Name</th>
              <th className="p-3 font-medium">Show Time</th>
              <th className="p-3 font-medium">Seats</th>
              <th className="p-3 font-medium">Amount</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-red-900/30 bg-red-950/40 hover:bg-red-900/40 transition"
              >
                <td className="p-3 pl-6">
                  {item?.user?.name || "No Name"}
                </td>

                <td className="p-3">
                  {item?.show?.movie?.title || "No Movie"}
                </td>

                <td className="p-3">
                  {formatDate(item?.show?.showDateTime)}
                </td>

                <td className="p-3">
                  {formatSeats(item?.bookedSeats)}
                </td>

                <td className="p-3 text-red-400 font-medium">
                  $ {item?.amount}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;