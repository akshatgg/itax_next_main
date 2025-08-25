'use client';
import React, { useState } from 'react';
import Registration from '../../../components/pagesComponents/dashboard/GSTR/GSTRPageComponent/GSTRPMTR';
import GSTRLoginWithoutOtp from '../../../components/pagesComponents/dashboard/GSTR/GSTRPageComponent/GSTRLoginWithoutOtp';
export default function GSTRRegistration() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Registration />
            {isOpen && <GSTRLoginWithoutOtp onClose={() => setIsOpen(false)} />}
        </>
    );
}