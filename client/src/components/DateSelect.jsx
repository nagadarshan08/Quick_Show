import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date')
    }

    navigate(`/movies/${id}/${selected}`) // ✅ fixed
    window.scrollTo(0, 0)
  }

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>

          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />

  
  <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
  {Object.keys(dateTime).map((date) => (
    <button
      key={date}
      onClick={() => setSelected(date)}
      className={`flex flex-col items-center justify-center px-5 py-3 rounded-md font-medium cursor-pointer transition
      ${
        selected === date
          ? "bg-[#F84565] text-white"
          : "border border-primary/70 text-gray-300 hover:bg-primary/20"
      }`}
    >
      <span className="text-lg">{new Date(date).getDate()}</span>
      <span className="text-sm">
        {new Date(date).toLocaleDateString("en-US", {
          month: "short",
        })}
      </span>
    </button>
  ))}
</div>

            <ChevronRightIcon width={28} />
          </div>
        </div>


        <button
          onClick={onBookHandler}
          className="px-7 py-2 bg-[#F84565] hover:bg-[#D63854] transition rounded-md font-medium cursor-pointer"
        >
          Book Now
        </button>

      </div>
    </div>
  )
}

export default DateSelect