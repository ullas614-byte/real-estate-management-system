import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'




export const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/home'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-600'>Easy</span>
        <span className='text-slate-950'>Estate</span>
      </h1>
      </Link>
      <form className='bg-slate-50 p-2 rounded-lg flex items-center'>
        <input type='text' placeholder='Search...' className='bg-transparent text-sm focus:outline-none w-24 sm:w-64'/>
        <FaSearch className='text-slate-600' />
      </form>
      <ul className='flex gap-5'>
      <Link to='/home'>
        <li className='text-slate-700 hover:underline hidden sm:inline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='text-slate-700 hover:underline hidden sm:inline'>About</li>
        </Link>
        <Link to='/sign-in'>
        <li className='text-slate-700 hover:underline'>Sign in</li>
        </Link>
      </ul>
      </div>
    
        

    </header>
  )
}
