






import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ClassSeeDetails = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', deadline: '', description: '' });
  const location = useLocation();
  const classDetails = location.state;


  const { data: enrollmentCount = 0, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: ['enrollmentCount', classDetails._id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getEnrollmentCount/${classDetails._id}`);
      return response.data.count; // Assuming the API returns an object { count: number }
    },
  });

  const { data: assignmentCount = 0, isLoading: isLoadingAssignments } = useQuery({
    queryKey: ['assignmentCount', classDetails._id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getAssignmentCount/${classDetails._id}`);
      return response.data.count;
    },
  });

  const { data: submissionCount = 0, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissionCount', classDetails._id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getSubmissionCount/${classDetails._id}`);
      return response.data.count;
    },
  });





  console.log(enrollmentCount)

  const createAssignmentMutation = useMutation({
    mutationFn: async (newAssignment) => axiosSecure.post(`/addAssignment`, newAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries(['classDetails']);
      Swal.fire('Success!', 'Assignment created successfully!', 'success');
      setModalOpen(false);
    },
  });





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    createAssignmentMutation.mutate({ ...formData, classId: classDetails._id });
  };

  console.log(classDetails);

  return (
    <div className="p-4">
      {/* Class Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold">Total Enrollments</h3>
          <p>{isLoadingEnrollment ? 'Loading...' : enrollmentCount}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold">Total Assignments</h3>
          <p>{isLoadingAssignments ? 'Loading...' : assignmentCount}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold">Total Assignment Submissions</h3>
          <p>{isLoadingSubmissions ? 'Loading...' : submissionCount}</p>
        </div>
      </div>

      {/* Add Assignment Section */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setModalOpen(true)}
        >
          Create Assignment
        </button>
      </div>

      {/* Modal for Creating Assignment */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Assignment Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSeeDetails;
