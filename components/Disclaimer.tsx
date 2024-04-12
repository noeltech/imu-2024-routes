import { useState } from "react";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isOpen) return null;
  return (
    <div className="absolute bottom-0 z-50 p-4">
      <div className="flex  md:w-[60%] rounded-md  relative mr-2">
        <div className="bg-white p-4 ">
          <p className="text-gray-800  font-serif">
            This Website is not affiliated with IGBARAS MOUNTAIN ULTRA 2024. Its
            sole purpose is to showcase its Race routes in reference with
            Igbaras Mountains. Some information may not be technically super
            accurate.For question or recommendations email me at
            banwadevtech@gmail.com
          </p>
        </div>
        <div className="bg-slate-900 absolute rounded-full w-12 h-12 right-[-14px] top-[-14px]">
          <button
            className="w-full h-full items-center justify-center flex "
            onClick={toggleOpen}
          >
            <span className="text-white ">X</span>
          </button>
        </div>
      </div>

      {/* <div className="bg-slate-900 p-2 ">
          <button
            className="w-full h-full items-center justify-normal flex px-3"
            onClick={toggleOpen}
          >
            <span className="text-white text-sm">!</span>
          </button>
        </div>
      */}
    </div>
  );
}
