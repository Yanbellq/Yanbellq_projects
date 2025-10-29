import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className='w-[100dvw] h-[100dvh] flex items-center justify-center'>
            <span className='text-3xl'>PaymentSuccess</span>

            { setTimeout(() => navigate('/'), 5000) }
        </div>
    )
}
