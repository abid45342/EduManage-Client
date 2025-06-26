





import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import StudentVideo from "../../components/StudentVideo";
import ShowVideos from "../../components/ShowVideos";
// import ReactStars from "react-stars"; // Make sure to import ReactStars if you haven't already

const MyEnrollClassDetails = () => {
  const location = useLocation();
  const { title } = location.state || {}; // Add fallback for undefined state
  console.log(location.state)
  
  const { classId } = useParams();
  console.log(classId);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isTERModalOpen, setTERModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ description: '', rating: 0 });
  const [submissionLinks, setSubmissionLinks] = useState({});

  const { data: assignments = [], isLoading, error } = useQuery({
    queryKey: ['assignments', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getAssignment/${classId}`);
      return res.data;
    },
  });
  console.log(assignments);


const submitAssignmentMutation = useMutation({
    mutationFn: async ({ assignmentId, userEmail, link, classId }) =>
      axiosSecure.post(`/submitAssignment`, { assignmentId, userEmail, link, classId }),
    onSuccess: async () => {
      // Increment the assignment count in the class after a successful submission
      await axiosSecure.patch(`/updateAssignmentCount/${classId}`);
      
      queryClient.invalidateQueries(['assignments', classId]);
      Swal.fire('Success!', 'Assignment submitted successfully!', 'success');
    },
  });

  // Submit TER feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: async (feedback) => axiosSecure.post(`/submitFeedback`, feedback),
    onSuccess: () => {
      Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
      setTERModalOpen(false);
    },
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setFeedbackData({ ...feedbackData, rating: newRating });
  };

  const handleSubmitFeedback = () => {
    const feedback = { ...feedbackData ,classId, userEmail: user.email,photoURL:user.photoURL,userName:user.displayName ,title:title };
    submitFeedbackMutation.mutate(feedback);
  };

  const handleSubmitAssignment = (assignmentId) => {
    const link = submissionLinks[assignmentId];
    if (!link) {
      Swal.fire('Error!', 'Please provide a submission link.', 'error');
      return;
    }
    submitAssignmentMutation.mutate({ assignmentId, userEmail: user.email, link, classId });
  };
  

  const handleLinkChange = (assignmentId, value) => {
    setSubmissionLinks((prevLinks) => ({
      ...prevLinks,
      [assignmentId]: value,
    }));
  };
  

  if (isLoading) return <p>Loading assignments...</p>;
  if (error) return <p>Error loading assignments: {error.message}</p>;

  return (
    <div className="p-6 overflow-x-auto">

<div className=" w-full flex justify-end">
<button
        className="flex justify-end  p-3  bg-blue-500 text-white rounded-full mb-5"
        onClick={() => setTERModalOpen(true)}
      >
        Teaching Evaluation Report 
      </button>
</div>
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Deadline</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.description}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.deadline}</td>
              <td className="border border-gray-300 px-4 py-2">
              <input
  type="text"
  placeholder="Submission Link"
  className="input input-bordered w-full mb-2"
  value={submissionLinks[assignment._id] || ''}
  onChange={(e) => handleLinkChange(assignment._id, e.target.value)}
/>

                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleSubmitAssignment(assignment._id)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {isTERModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Teaching Evaluation Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={feedbackData.description}
                  onChange={handleFeedbackChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Rating</label>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={feedbackData.rating}
                  onChange={handleRatingChange}
                />
              </div>
              <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => setTERModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmitFeedback}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



     <div>
       <StudentVideo  cls_id={classId}></StudentVideo>
     </div>



{/* <StudentVideo cls_id={classId}></StudentVideo> */}



    </div>
   
  );
};

export default MyEnrollClassDetails;



