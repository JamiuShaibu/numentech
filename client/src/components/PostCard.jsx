import { useState } from "react";
import PropTypes from "prop-types";
import UpdatePost from "./UpdatePost";
import { useSelector } from "react-redux";

const PostCard = ({ post, onDelete, onUpdate, onPostDeleted}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [editButtonIsClicked, setEditButtonIsClicked] = useState(false);
  const [deleteButtonIsClicked, setDeleteButtonIsClicked] = useState(false);

  const handleDeleteClicked = () => {
    setDeleteButtonIsClicked(!deleteButtonIsClicked);
  }

  const handleDeletePost = async () => {
    try {
      await onDelete();
      onPostDeleted(post._id); // Notify Home component of post deletion
      setDeleteButtonIsClicked(false); // Close the delete popup
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="relative shadow-lg bg-slate-100 p-5 flex flex-col gap-2 relative">
      {currentUser && post.userRef === currentUser._id && (
        <div className="flex gap-4 justify-end items-center text-gray-600 absolute top-1 right-4">
          <button className="hover:text-gray-500 text-xm font-semibold underline">
            <span onClick={handleDeleteClicked}>DELETE</span>
          </button>
          <button
            onClick={() => setEditButtonIsClicked(true)}
            className="hover:text-gray-500 text-xm font-semibold underline"
          >
            EDIT
          </button>
          {deleteButtonIsClicked && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={handleDeleteClicked}
              ></div>
              <div className="relative bg-white p-6 rounded-lg shadow-md w-96">
                <p className="text-lg text-center">{post.title} </p>
                <p className="text-slate-700 text-center mb-4 font-semibold max-w-xs w-full overflow-clip truncate">
                  {post.subTitle}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleDeleteClicked}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {editButtonIsClicked && (
            <UpdatePost
              post={post}
              onCancel={() => setEditButtonIsClicked(false)}
              onUpdate={onUpdate}
            />
          )}
        </div>
      )}
      <div className="relative top-2 flex gap-4 items-center pb-2 sm:pb-4">
        <div className="rounded-full bg-gray-400 h-[60px] border border-slate-100 w-[60px] sm:h-[80px] sm:w-[80px] object-cover absolute z-20"></div>
        <div className="bg-gray-400 text-white py-1 px-2 pl-[30px] sm:pl-[50px] ml-5 w-full relative left-5 top-0">
          <p className="font-semibold">{post.createdBy}</p>
        </div>
      </div>
      <p className="relative flex justify-end bottom-1 sm:bottom-3 right-0 sm:right-1 text-gray-400 text-[11px] font-semibold text-gray-400">
        {post.createdAt}
      </p>
      <p className="text-gray-700 text-lg font-semibold">
        {post.title}
      </p>
      <p className="text-gray-800">{post.body}</p>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};

export default PostCard;