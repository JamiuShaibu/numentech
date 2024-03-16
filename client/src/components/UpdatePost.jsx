
import {useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";



const UpdatePost = ({ post, onCancel, onUpdate }) => {

  const { currentUser, loading} = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userRef: "",
    createdBy: "",
    
  });
  
  useEffect(() => {
    const fetchTestimonial = () => {
      setFormData(post);
    };

    fetchTestimonial();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/post/update/${post._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          createdBy: currentUser.username,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        return;
      }
      onCancel(); // Close the form
      onUpdate(); // Inform Home component to update
    } catch (err) {
      console.log("Error updating post:", err);
    }
  };
  
 console.log(formData);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <form className="flex flex-col gap-4 bg-teal-50 p-7 z-[70] rounded-lg">
        <input
          type="text"
          placeholder="Title"
          className="border focus:outline-none p-3 rounded-lg"
          id="title"
          onChange={handleChange}
          value={formData.title}
          required
          maxLength="100"
          minLength="5"
        />
        <textarea
          type="text"
          placeholder="What do you have to say?"
          className="border focus:outline-none p-3 rounded-lg h-[180px] sm:w-[450px]"
          id="body"
          onChange={handleChange}
          value={formData.body}
          required
          maxLength="250"
          minLength="10"
        />
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-slate-700 text-white px-4 py-2 rounded mr-4 hover:bg-slate-600"
          >
            {loading ? `Loading...` : `Update`}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

UpdatePost.propTypes = {
  post: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdatePost;
