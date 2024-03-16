import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message));
    }

  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Your Account</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input 
            id="email" 
            type="email" 
            required
            onChange={handleChange} 
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="password" 
            className="sr-only">Password</label>
            <input 
            id="password"  
            type="password" 
            required 
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div>
          <button type="submit" className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none">
            {!loading? "Sign In": "Signing in..."}
          </button>
        </div>
        <p>Don&apos;t have an account? <span className="text-teal-400"><Link to="/signup">Sign Up</Link></span></p>
      </form>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  </div>

  )
}

export default SignIn
