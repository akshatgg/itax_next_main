"use client";
import { useState } from 'react';
import ITRSteps from './ITR_func/ITRSteps';
import PersonalInfo from './ITR_func/PersonalInfo/PersonalInfo';
import Address from './ITR_func/PersonalInfo/Address';
import BankDetails from './ITR_func/PersonalInfo/BankDetails';
import { InputStyles } from "@/app/styles/InputStyles";

export default function ITRPresonalInfo({ userProfile }) {
    const [section, setSection] = useState(sectionList[0]);
    function activeTab() {
        if (section === sectionList[1]) {
            return  <BankDetails setSection={setSection} />
        } else if (section === sectionList[2]) {
            return <Address setSection={setSection} />
        } else {
        return <PersonalInfo setSection={setSection} userProfile={userProfile}/>
        }
    }
    return (
        <>
            <ITRSteps
                steps={sectionList}
                active={section}
                setSection={setSection}
            />

            { activeTab() }
        </>
    );
}

const sectionList = ['Personal Information', 'Bank Details', 'Address'];

