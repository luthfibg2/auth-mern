import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';

const Home = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cadmium-400 to-cadmium-500 text-transparent bg-clip-text">
          Beranda
      </h2>

      <div className="space-y-6">
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-cadmium-400 mb-3">
            Informasi Pengguna
          </h3>
          <p className="text-gray-300">Nama: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
        >
          <h3 className="text-xl font-semibold text-cadmium-400 mb-3">Aktivitas Akun</h3>
          <p className="text-gray-300">
            <span className="font-bold">Mulai pada: </span>
            {new Date(user.createdAt).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Terakhir Masuk: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='mt-4'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className='w-full py-3 px-4 bg-gradient-to-r from-cadmium-500 to-emerald-800 text-white font-bold rounded-lg shadow-lg hover:from-cadmium-600 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-cadmium-500 focus:ring-offset-2 focus:ring-offset-gray-900'
          >
            Keluar
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Home