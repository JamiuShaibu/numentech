import { Fragment, useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import WritePost from '../components/WritePost';
import { useSelector } from 'react-redux';


/* 
Note: This project contains secrete keys which are used to authenticate the user.
These keys are stored in the .env file in the root directory of the project.
Normally .env files are ignored, and never to be pushed, especially to a public repository, but at the nature of this project, .env is pushed to facilitate testing.
*/
const Home = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showWritePost, setShowWritePost] = useState(false);


  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/get`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      
      if (data.success === true) {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handlePostDeleted = (deletedPostId) => {
    // Remove the deleted post from the posts state
    setPosts(posts.filter((post) => post._id !== deletedPostId));
  };

  return (
    <div className="container mx-auto my-8 px-2 sm:px-6">
      <div className="pb-7 font-semibold text-center mb-8 text-gray-800">
        <h2 className="text-3xl text-gray-800 underline">Daily Funny Quotes</h2>
        <p className="text-2xl text-gray-500">What did you find funny Today?</p>
      </div>
      {!error ? (
        <Fragment>
          {currentUser &&  (
            <button onClick={() => setShowWritePost(true)} className="rounded-lg mb-4 right-0 border bg-teal-900 hover:bg-teal-800 text-white text-lg cursor-pointer w-fit h-10 px-4 flex justify-center items-center">
            Make a post
            </button>
          )}
          {showWritePost && (
            <WritePost onCancel={() => setShowWritePost(false)} onPostCreated={fetchPosts}/>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {!loading ?
              posts.map((post, index) => (
                <PostCard key={index} post={post} onDelete={() => handleDeletePost(post._id)} onUpdate={fetchPosts} onPostDeleted={handlePostDeleted}/>
              )):<span>Loading...</span>}
          </div>
        </Fragment>
      ):<p>Something went wrong</p>}
    </div>
  )
}

export default Home
