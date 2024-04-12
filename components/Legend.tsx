import React from "react";
import Image from "next/image";
import trail from "../public/trail.svg";
import mountain from "../public/mountain.svg";
import cp from "../public/cp.svg";
import water from "../public/water.svg";
import aid from "../public/aid.svg";
import * as Collapsible from "@radix-ui/react-collapsible";
import arrowDownRight from "../public/arrowDownRight.svg";

const legendList = [
  { id: "trail", name: "Trail Route", icon: trail, width: 20, height: 20 },
  {
    id: "mountain",
    name: "Mountain Peak",
    icon: mountain,
    width: 20,
    height: 20,
  },
  { id: "cp", name: "Check Point", icon: cp, width: 20, height: 20 },
  { id: "water", name: "Water Source", icon: water, width: 16, height: 16 },
  { id: "aid", name: "Aid Station", icon: aid, width: 18, height: 18 },
];

export default function Legend() {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        {open ? (
          <div className="absolute -top-4 -left-4">
            <button className=" bg-slate-900  z-50 rounded-full w-10 h-10 p-0 flex justify-center items-center">
              <span className="text-white text-sm">
                <Image
                  src={arrowDownRight}
                  alt="Trail Routes Image"
                  width={14}
                  height={14}
                />
              </span>
            </button>
          </div>
        ) : (
          <button className="p-2 bg-slate-900 text-white mr-2 rounded-sm">
            Legend
          </button>
        )}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="text-white bg-black/70 mr-2">
          <ul className="p-6">
            {legendList.map((item) => {
              return (
                <LegendItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  width={item.width}
                  height={item.height}
                />
              );
            })}
          </ul>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function LegendItem({ id, name, icon, width, height }) {
  return (
    <li key={id} className="flex justify-start items-center gap-4 mt-1">
      <Image
        priority
        src={icon}
        alt="Trail Routes Image"
        height={height}
        width={width}
      />
      <p className=" text-base font-light">{name}</p>
    </li>
  );
}
