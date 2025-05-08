import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "Minimum 6 karakter", met: password.length >= 6 },
        {label: "Mengandung huruf besar", met: /[A-Z]/.test(password)},
        {label: "Mengandung huruf kecil", met: /[a-z]/.test(password)},
        {label: "Mengandung angka", met: /\d/.test(password)},
        {label: "Mengandung simbol", met: /[^A-Za-z0-9]/.test(password)},
    ];

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className='flex items-center text-xs'>
                    {item.met ? (<Check className='size-4 text-cadmium-500 mr-2' />) : (
                        <X className='size-4 text-red-400 mr-2'/>
                    )}
                    <span className={item.met ? 'text-cadmium-400' : 'text-gray-400'}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}
const PasswordStrengthMeter = ({password}) => {
    const getStrength = (pass) => {
        let strength = 0;
        if(pass.length >= 6) strength++;
        if(pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
        if(pass.match(/\d/)) strength++;
        if(pass.match(/[^A-Za-z\d]/)) strength++;
        return strength;
    }
    const strength = getStrength(password);

    const getColor = (strength) => {
        if(strength === 0) return 'bg-red-400';
        if(strength === 1) return 'bg-red-400';
        if(strength === 2) return 'bg-yellow-400';
        if(strength === 3) return 'bg-cadmium-500';
        return 'bg-steel-500';
    }

    const getStrengthText = (strength) => {
        if(strength === 0) return 'Very Weak';
        if(strength === 1) return 'Weak';
        if(strength === 2) return 'Good';
        if(strength === 3) return 'Strong';
        return 'Very Strong';
    }
  return (
    <div className="mt-2">
        <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400">Password Strength</span>
            <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
        </div>
        <div className="flex space-x-1">
            {[...Array(4)].map((_, index) => (
                <div
                key={index}
                className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                    ${index < strength ? getColor(strength) : 'bg-gray-600'}
                `}></div>
            ))}
        </div>
        <PasswordCriteria password={password}/>
    </div>
  )
}
export default PasswordStrengthMeter