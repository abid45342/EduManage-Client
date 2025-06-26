import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';

const UploadModal = ({ setFormOpen ,cls_id}) => {
    const axiosPublic = useAxiosPublic();

const updateModule = useMutation({
    mutationFn:async({cls_id,newModule})=>{
        const res = await axiosPublic.patch(`/class/${cls_id}`,{newModule});
        return res.data;
    }
})

    const handleSubmit = (e)=>{
    e.preventDefault();
    const weekNo = e.target[0].value;
    const title = e.target[1].value;
    console.log({ weekNo, title });
    const newModule = {
        id:weekNo,
        title:title,
        duration:"0",
        videos: [],
    }
    updateModule.mutate({cls_id,newModule});
    setFormOpen(false);
    e.target.reset();
    }

  return (
    <div className="absolute z-10  inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl mb-4">Add New Module</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Week no"
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-4 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
