import { useState } from "react";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="absolute bottom-10">
      {isOpen ? (
        <div className="flex">
          <div className="bg-black p-4 ">
            <p className="text-white text-xs">
              This Website is not affiliated with IGBARAS MOUNTAIN ULTRA 2024.
              Its sole purpose is to showcase its Race routes in reference with
              Igbaras Mountains. Some information may not be technically super
              accurate.For question or recommendations email me at
              noelbajande@gmail.com
            </p>
          </div>
          <div className="bg-slate-900 ">
            <button
              className="w-full h-full items-center justify-normal flex px-3"
              onClick={toggleOpen}
            >
              <span className="text-white">X</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 p-2 ">
          <button
            className="w-full h-full items-center justify-normal flex px-3"
            onClick={toggleOpen}
          >
            <span className="text-white text-sm">Disclaimer</span>
          </button>
        </div>
      )}
    </div>
  );
}
