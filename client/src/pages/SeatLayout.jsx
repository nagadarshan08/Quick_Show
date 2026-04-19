import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  assets,
  dummyDateTimeData,
  dummyShowsData,
} from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const getShow = () => {
    const foundShow = dummyShowsData.find(
      (s) => String(s._id) === String(id)
    );

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const timings =
    show?.dateTime?.[date] ||
    Object.values(show?.dateTime || {})[0] ||
    [];

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex justify-center gap-2 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border text-xs transition
              ${
                selectedSeats.includes(seatId)
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-500 text-gray-300 hover:border-red-500 hover:text-white"
              }
            `}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-20 md:pt-40 text-white">

      {/* LEFT */}
      <div className="w-60 bg-white/5 border border-gray-700 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>

        <div className="mt-5 space-y-2">
          {timings.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">
                {item?.time ? isoTimeFormat(item.time) : "No Time"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">
          Select your seat
        </h1>

        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        {/* A & B */}
        <div className="mb-6">
          {groupRows[0].map((row) => renderSeats(row))}
        </div>

        {/* Other rows */}
        <div className="grid grid-cols-2 gap-10">
          {groupRows.slice(1).map((group, idx) => (
            <div key={idx}>
              {group.map((row) => renderSeats(row))}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            if (!selectedTime) return toast("Select time");
            if (selectedSeats.length === 0)
              return toast("Select seats");

            const newBooking = {
              show: {
                movie: show.movie,
                showDateTime: selectedTime.time,
              },
              bookedSeats: selectedSeats,
              amount: selectedSeats.length * 200,
              isPaid: true,
            };

            localStorage.setItem("booking", JSON.stringify(newBooking));

            navigate("/my-bookings");
          }}
          className="mt-10 bg-red-500 px-8 py-3 rounded-full text-white hover:bg-red-600"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;