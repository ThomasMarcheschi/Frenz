import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Validation from '../assets/RegisterValidation.jsx'
import { API_URL } from '../config.js';
function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const usersData = response.data; 
      const usernames = usersData.map((user) => user.username)
      setUsers(usernames)
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = Validation(values, users)
    setErrors(validationErrors)
    
    if(Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${API_URL}/auth/local/register`, {
          username: values.username,
          email: values.email,
          password: values.password
        })
        if (response.status === 200) {
          localStorage.setItem('token', response.data.jwt); 
          navigate('/');
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors({ ...errors, email: "L'utilisateur existe déjà" })
        }
        console.log(err)
      }
    }
  }
  
  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-[#18181b] overflow-hidden'>
      <div className='fixed inset-0 bg-[#18181b]'></div>
      <div className='flex w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 max-w-5xl rounded-xl shadow-2xl relative z-10'>

        <div className='relative w-1/2 hidden md:block'>
          <img 
            src="https://images.unsplash.com/photo-1574692142297-8a6d4051730b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Personne prenant en photo le ciel violet" 
            className='h-full w-full object-cover rounded-l-xl'
          />
          
          <div className='absolute inset-0 bg-black bg-opacity-40 rounded-l-xl'></div>

          <div className='absolute bottom-0 left-0 p-12 text-white z-10'>
            <h2 className='text-5xl font-bold mb-2 font-baloo'>Just post it !</h2>
            <p className='text-2xl font-baloo'>And discover the world around you</p>
          </div>
        </div>

        <div className='w-full md:w-1/2 bg-[#27272a] p-8 flex flex-col items-center justify-center rounded-xl md:rounded-l-none md:rounded-r-xl'>
          <h1 className='text-4xl font-bold text-[#ffffff] mb-6 text-center font-baloo'>
            <span className='text-[#9333ea]'>F</span>renz
          </h1>
          <div className='flex justify-center mb-6 space-x-6'>
            
            <a href="#" className='text-[#c084fc]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <text x="9" y="18" fill="currentColor" fontFamily="Arial" fontWeight="bold" fontSize="18">f</text>
              </svg>
            </a>

            <a href="#" className='text-[#c084fc]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a href="#" className='text-[#c084fc]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
          
          <p className='text-[#a1a1aa] text-center mb-6 font-baloo'>Ou alors avec ton email ?</p>
          
          <div className="space-y-3 w-full px-4">
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-500 bg-opacity-10 text-red-500 p-3 rounded-lg text-sm mx-auto max-w-xs font-baloo">
                {errors.username || errors.email || errors.password || errors.confirmPassword}
              </div>
            )}
            
            <div className="mx-auto max-w-xs w-full">
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={values.username}
                onChange={handleChanges} 
                placeholder="Identifiant" 
                className="w-full p-3 bg-[#18181b] text-[#ffffff] rounded-lg outline-none font-baloo border border-[#3f3f46] focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] transition-colors" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs w-full">
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={values.email}
                onChange={handleChanges} 
                placeholder="Email" 
                className="w-full p-3 bg-[#18181b] text-[#ffffff] rounded-lg outline-none font-baloo border border-[#3f3f46] focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] transition-colors" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs w-full">
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={values.password}
                onChange={handleChanges} 
                placeholder="Mot de passe" 
                className="w-full p-3 bg-[#18181b] text-[#ffffff] rounded-lg outline-none font-baloo border border-[#3f3f46] focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] transition-colors" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs w-full">
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={values.confirmPassword}
                onChange={handleChanges} 
                placeholder="Confirmez votre mot de passe" 
                className="w-full p-3 bg-[#18181b] text-[#ffffff] rounded-lg outline-none font-baloo border border-[#3f3f46] focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] transition-colors" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs w-full mt-4">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-[#6b21a8] text-[#ffffff] font-medium rounded-full hover:bg-[#9333ea] transition-colors font-baloo"
              >
                S'inscrire
              </button>
            </div>
          </div>
          
          <div className='text-center mt-6 w-full'>
            <p className='text-[#a1a1aa] font-baloo'>Compte existant?</p>
            <Link to='/login' className='text-[#c084fc] hover:text-[#9333ea] hover:underline mt-1 inline-block font-baloo transition-colors'>
              C'est par ici !
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register