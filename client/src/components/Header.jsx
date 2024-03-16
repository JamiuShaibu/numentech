import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment } from 'react';
import SignOut from './handleSignOut';
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex gap-4 sm:gap-10 items-center justify-between sticky top-0 z-40 px-4 sm:px-10 bg-teal-400 text-white h-12 text-lg shadow-lg'>
    <div>
      <Link to="/" className='hover:underline'>Home</Link>
    </div>
    <div className='flex gap-10 items-center'>
      {!currentUser ? (
        <Fragment>
          <Link to="/signin" className='hover:underline'>Sign In</Link>
          <Link to="/signUp" className='hover:underline'>Sign Up</Link>
        </Fragment>

      ): (
        <Fragment>
          <Link to={`/profile/${currentUser._id}`} className='hover:underline'>Hi {currentUser.username.split(' ')[0]}! </Link>
          <SignOut />
        </Fragment>
      )}
    </div>
    </div>
  )
}

export default Header

