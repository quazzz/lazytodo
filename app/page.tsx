"use client";
import Card from "@/components/card";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckIcon } from "lucide-react";
type Task = {
  task: string;
  scheldule: string;
  uniqueId: any;
  description: string;
};
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scheldule, setScheldule] = useState("");
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const submit = () => {
    if (!task || !description || !scheldule) {
      toast.error("all fields must be filled");
      return;
    }
    setTasks((prev) => [
      ...prev,
      { task, scheldule, uniqueId: Date.now(), description },
    ]);

    setTask("");
    setDescription("");
    setScheldule("");
    toast.success("added succefully");
  };
  const deleteTask = (id: any) => {
    const newTasks = tasks.filter((task) => task.uniqueId != id);
    setTasks(newTasks);
    toast.success("deleted succefully");
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-violet-200">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="rgba(255, 255, 255, 0.97)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="form z-10 bg-black bg-opacity-70 p-6 rounded-lg border border-violet-500 shadow-lg flex flex-col gap-4 w-full max-w-2xl mt-[100px]">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="bg-gray-800 text-violet-100 border border-violet-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-violet-300 placeholder-opacity-50 flex-1"
            type="text"
            placeholder="enter task..."
          />
          <input
            value={scheldule}
            onChange={(e) => setScheldule(e.target.value)}
            className="bg-gray-800 text-violet-100 border border-violet-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 w-full sm:w-auto"
            type="time"
          />
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 text-violet-100 border border-violet-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-violet-300 placeholder-opacity-50 w-full"
          type="text"
          placeholder="enter description..."
        />
        <button
          onClick={submit}
          className="cursor-pointer bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200 focus:ring-2 focus:ring-violet-400 focus:outline-none shadow-md hover:shadow-violet-500/30 self-end"
        >
          <CheckIcon size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl z-10">
        {tasks.length > 0 && tasks ? (
          tasks.map((task, idx) => (
            <Card
              name={task.task}
              key={idx}
              id={task.uniqueId}
              scheldule={task.scheldule}
              onDelete={deleteTask}
              desc={task.description}
            />
          ))
        ) : (
          <div className="text-violet-300 opacity-70 col-span-full text-center text-lg italic">
            no tasks
          </div>
        )}
      </div>
    </div>
  );
}
