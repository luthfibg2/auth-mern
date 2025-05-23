import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerification = () => {

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // const {error, isLoading, verifyEmail} = useAuthStore();
    const {error, isLoading, verifyEmail} = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        // handle pasted content
        if (value.length > 1) {
            const pastedCode = value.split('');
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode);
            // focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }

    }
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        try {
            await verifyEmail(verificationCode);
            navigate('/');
            toast.success('Email verified successfully');
        } catch (error) {
            console.log(error);
        }
    }

    // auto submit when all fields are filled
    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit(new Event('submit'));
        }
    }, [code])

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cadmium-400 to-cadmium-500 text-transparent bg-clip-text">
                Verifikasi Email
            </h2>
            <p className="text-center text-gray-300 mb-6">Masukkan 6 digit kode yang dikirim ke email Anda.</p>
            <form onSubmit={handleSubmit} method="post" className='space-y-6'>
                <div className="flex justify-between">
                    {code.map((digit, index) => (
                        <input 
                        key={index}
                        type='text'
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-cadmium-500 focus:outline-none'/>
                    ))}
                </div>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <motion.button className='w-full mt-5 py-3 px-4 bg-gradient-to-r from-cadmium-500 to-emerald-800 text-white font-bold rounded-lg shadow-lg hover:from-cadmium-600 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-cadmium-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}>
                    {isLoading ? 'Mem-verifikasi...' : 'Verifikasi'}
                </motion.button>
            </form>
        </motion.div>
    </div>
  )

}

export default EmailVerification