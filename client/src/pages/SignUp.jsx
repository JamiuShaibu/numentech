import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        setIsLoading(false);
        setError(data.message);
        return
      }
      setIsLoading(false);
      setError(null);
      navigate('/signin');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }

  }
  console.log(formData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Username</label>
              <input 
                id="username" 
                type="text" 
                required 
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none sm:text-sm" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email" 
                type="email" 
                required 
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                type="password" 
                required 
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none">
              {!isLoading? "Sign Up": "Signing up..."}
            </button>
          </div>
        </form>
        <p>You already have an account? <span className="text-teal-400"><Link to="/signin">Sign In</Link></span></p>
        
        {error && (
          <p className="font-semibold text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
}

export default SignUp
