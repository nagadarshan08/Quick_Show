import { useState } from "react"
import { dummyTrailers } from "../assets/assets"
import BlurCircle from "./BlurCircle"

const TrailersSection = () => {

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">

      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        {/* VIDEO PLAYER */}
        <div className="mx-auto max-w-[960px] aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={currentTrailer.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        
<div className="mt-6 flex justify-center">
  <div className="flex gap-4 flex-wrap justify-center">
    {dummyTrailers.map((trailer, index) => (
      <img
        key={index}
        src={trailer.image}
        onClick={() => setCurrentTrailer(trailer)}
        className={`w-40 cursor-pointer rounded-lg transition duration-300 
        ${currentTrailer.videoUrl === trailer.videoUrl ? "border-2 border-red-500" : ""}`}
      />
    ))}
  </div>
</div>

      </div>
    </div>
  )
}

export default TrailersSection