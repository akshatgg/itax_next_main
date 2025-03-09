"use client"
import { useEffect, useRef } from 'react';
import useAuth from '@/hooks/useAuth.js';
import Link from 'next/link.js';
const BLAZ_URL = process.env.NEXT_PUBLIC_BLAZ_URL;
export default function BillShillLink({ path = '/', text, className }) {
    
    const {user:currentUser, token} = useAuth().currentUser;

    const childWindowRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();

        childWindowRef.current = window.open(BLAZ_URL, '_blank');
    };

    const handleMessage = (e) => {
        if (e.origin !== BLAZ_URL) {
            return;
        }

        if (childWindowRef.current) {
            childWindowRef.current.postMessage(
                { data: currentUser, token, redirect: path },
                BLAZ_URL
            );

            console.log('SENT TOKEN');
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <Link
            href="/"
            onClick={handleClick}
            className={className}
            // className="py-3 px-1 w-56 font-bold text-slate-700 hover:text-blue-600 flex items-center justify-between"
        > 
            {text}<sup>billshill</sup>
        </Link>
    );
}
