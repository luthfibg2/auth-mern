import { motion } from 'framer-motion'
import { LoaderPinwheel, Lock, MailIcon, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

import React from 'react'
import Input from '../components/Input'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

const SignUp = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cadmium-400 to-cadmium-500 text-transparent bg-clip-text">
                Buat Akun
            </h2>
            <form onSubmit={handleSignUp}>
              <Input 
              icon={User}
              type='text'
              placeholder='Nama Lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}/>

              <Input 
              icon={MailIcon}
              type='email'
              placeholder='Alamat Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
              
              <Input 
              icon={Lock}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>

              {error && <p className='text-red-400 text-xs mt-2'>{error}</p>}
              
              <PasswordStrengthMeter password={password}/>

              <motion.button className='w-full mt-5 py-3 px-4 bg-gradient-to-r from-cadmium-500 to-emerald-800 text-white font-bold rounded-lg shadow-lg hover:from-cadmium-600 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-cadmium-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={isLoading}>
                {isLoading ? <LoaderPinwheel className='animate-spin size-4 lg:size-6 mx-auto'/> : 'Daftar'}
              </motion.button>
            </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link to={'/login'} style={{ color: '#3fb290', fontWeight: 'bold' }}>Masuk</Link>
          </p>
        </div>
    </motion.div>
  )
}

export default SignUp