"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/navigation";

import { list } from "./staticData";
import { All_Apis } from "../../icons";

export default function Apis() {
  const router = useRouter();

  const [section, setSection] = useState("All Apis");
  const [renderApiList, setRenderApiList] = useState(list);

  return (
    <div>
      <div className="flex items-center md:justify-center overflow-x-scroll md:overflow-auto mt-10 max-w-7xl mx-auto">
        {[{ title: "All Apis", icon: All_Apis }, ...list].map((element) => (
          <div
            key={element.title}
            onClick={() => {
              setSection(element.title);
              const newList = list.find((item) => item.title === element.title);
              setRenderApiList(newList ? [newList] : list);
            }}
            className={`h-28 w-36 flex md:items-center justify-center px-5 border-b-4 mx-3 cursor-pointer ${
              section === element.title
                ? "border-primary fill-primary text-primary"
                : "border-white fill-zinc-500 text-zinc-500"
            }`}
          >
            <div className="flex flex-col text-center items-center">
              {element.isPng === true ? (
                <img className="w-[30px]" src={element.icon} alt="icon" />
              ) : (
                <span className="object-contain h-9 w-9">{element.icon}</span>
              )}
              <p className="font-semibold mt-5">{element.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-10 md:rounded-xl bg-gray-200 p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {renderApiList.map((element) =>
          element.apis.map((element, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(
                  `/apis/docs/${element.label.replace(/ /g, "").toLowerCase()}`
                );
              }}
              className="flex flex-col justify-start items-center py-8 px-3 bg-white shadow-md rounded-lg mx-8 md:mx-0 cursor-pointer"
            >
              {element.isPNG ? (
                <img className="w-[40px] object-cover rounded-lg" src={element.icon} alt="icon" />
              ) : (
                <span className="object-contain h-11 w-11 fill-zinc-600">
                  {element.icon}
                </span>
              )}
              <div>
                <p className="font-bold text-center my-8 text-lg">{element.label}</p>
                <p className="text-sm text-center mt-1">{element.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    
  );
}