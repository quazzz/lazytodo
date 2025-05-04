'use client'
import { Trash2, CheckIcon } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
export default function Card({ name, scheldule, onDelete, id, desc }) {
  const [checked,setChecked] = useState(false);
  return (
    <div className="bg-black bg-opacity-95 border border-violet-500 rounded-lg p-5 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h1 className="text-violet-300 font-bold text-xl">{name}</h1>
        <div className="">
          <button
            onClick={() => onDelete(id)}
            className="cursor-pointer text-violet-300 hover:text-violet-100 p-1 rounded-full hover:bg-violet-800/50 transition-all duration-200 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            aria-label="Delete card"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="border-b border-violet-800/50 pb-2 mb-3">
        <span className="text-violet-200 text-sm font-medium bg-violet-900/30 px-2 py-1 rounded-md">
          {scheldule}
        </span>
      </div>

      <p className="text-violet-200 text-md opacity-90 mb-2 line-clamp-3">
        {desc}
      </p>

      <div className="w-full mt-2 bg-violet-900/20 h-1 rounded-full overflow-hidden">
        <div className="bg-violet-500 h-1 w-1/2 rounded-full"></div>
      </div>
    </div>
  );
}
