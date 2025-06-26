


import React, { useState } from "react";
import { FiPlus, FiMinus, FiChevronDown } from "react-icons/fi";
import UploadVideo from "./UploadVideo";
import UploadModal from "./UploadModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


export default function ShowVideos({ cls_id }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const {data:classData = {} ,isLoading}=useQuery({
    queryKey:['class',cls_id],
    queryFn:async ()=>{
      const res = await axiosPublic.get(`/class/${cls_id}`);
      return res.data;
    },
  });
  // console.log(classData.modules[0]?.videos[0]?.videoUrl);
 


 const [expanded, setExpanded] = useState({});
   const [search, setSearch] = useState("");

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  React.useEffect(() => {
    if (classData?.modules) {
      const init = {};
      classData?.modules.forEach((module) => {
        init[module.id] = false;
      });
      setExpanded(init);
    }
  }, [classData.modules]);

  if (isLoading) return <div>Loading...</div>;
  if (!classData.modules) return <div>No modules available.</div>;




  return (
    <div className="flex h-screen">
      {formOpen &&(
        <UploadModal setFormOpen={setFormOpen} cls_id={cls_id}  />
      )}
      {/* Video Player */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">{classData.title}</h1>
        <div className="bg-black">
          <video
            src={activeVideo || "https://demo.com/video/default"}
            controls
            poster="https://i.ibb.co/ZH5zhvy/image.png"
            className="w-full h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
          </div>
          <a href="#" className="text-red-500 flex items-center">
            <span className="mr-1">⚠️</span> Copyright warning
          </a>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-96 border-l p-6 overflow-y-auto bg-gray-50">
        {/* Header with progress */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Course Content</h2>
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full transition-all" />
          </div>
          <span className="ml-2 text-sm font-medium">100%</span>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Lesson"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        {/* Modules and lessons */}
        {classData.modules.map((module) => {
          const lessons = module.videos.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()));

          return (
            <div key={module.id} className="mb-2 bg-white rounded shadow">
              <button
                onClick={() => toggleExpand(module.id)}
                className="w-full flex justify-between items-center p-3"
              >
                <div>
                  <div className="font-semibold">{module.title}</div>
                  <div className="text-sm text-gray-500">
                    {module.duration} • {module.videos.length} videos
                  </div>
                </div>
                {expanded[module.id] ? (
                  <FiMinus className="text-blue-500" />
                ) : (
                  <FiPlus className="text-blue-500" />
                )}
              </button>

              {expanded[module.id] && ( 
               
                                  <ul>
                  {lessons.map((les) => (
                    <li
                      key={les.id}
                      onClick={() => setActiveVideo(les.videoUrl)}
                      className="p-2 pl-6 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span className="text-sm">{les.title}</span>
                      <FiChevronDown className="text-gray-400" />
                    </li>
                   
                  ))}
                     
                     <UploadVideo  cls_id={cls_id} moduleId={module.id} />
                </ul>
            



                
              )
             
              }
         
          
            </div>
          );
        })}
       <FiPlus onClick={() => setFormOpen(!formOpen)}  className=" text-2xl text-blue-500 flex mx-auto" />
        <button className="mt-6 w-full py-2 bg-blue-600 text-white rounded">Complete Course</button>
      </div>
    </div>
  );
}
























