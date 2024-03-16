import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const WritePost = ({ onCancel, onPostCreated }) => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userRef: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
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
      // Callback to update posts in the Home component:
      // Note: A robust approach can taken working on a larger project. Example: by using react-queiry
      onPostCreated() 
      onCancel();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-teal-50 p-7 z-[70] rounded-lg"
      >
        <input
          type="text"
          placeholder="Post Title"
          className="border focus:outline-none p-3 rounded-lg"
          id="title"
          onChange={handleChange}
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
          required
          maxLength="250"
          minLength="10"
        />
        <div className="flex justify-center">
          <button className="bg-slate-700 text-white px-4 py-2 rounded mr-4 hover:bg-slate-600">
            {loading
              ? "Loading..."
              : "Submit"}
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
}

WritePost.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onPostCreated: PropTypes.func.isRequired,
};

export default WritePost