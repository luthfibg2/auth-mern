import { useState } from 'react'
import { motion } from 'framer-motion'
import { MailIcon, Lock, LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom'

import Input from '../components/Input'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;

  const handleLogin = (e) => {
    e.preventDefault();
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
            Selamat Kembali
        </h2>
        <form onSubmit={handleLogin}>
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

            <div className="flex items-center">
              <Link to='/forgot-password' style={{ color: '#3fb290', fontWeight: 'normal', fontSize: '12px' }}>Lupa Password?</Link>
            </div>

          <motion.button className='w-full mt-5 py-3 px-4 bg-gradient-to-r from-cadmium-500 to-emerald-800 text-white font-bold rounded-lg shadow-lg hover:from-cadmium-600 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-cadmium-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isLoading}>
            {isLoading ? <LoaderPinwheel className='size-5 animate-spin mx-auto' /> : 'Masuk'}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Belum punya akun?{' '}
          <Link to={'/signup'} style={{ color: '#3fb290', fontWeight: 'bold' }}>Daftar</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login