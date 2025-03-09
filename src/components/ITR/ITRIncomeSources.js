"use client"
import { useState } from 'react';
import ITRSteps from './ITR_func/ITRSteps';
import BusinessProfession from './ITR_func/IncomeSources/BusinessProfession';
import Salary from './ITR_func/IncomeSources/Salary';
import OtherIncome from './ITR_func/IncomeSources/OtherIncome';
import HouseProperty from './ITR_func/IncomeSources/HouseProperty';
import CapitalGain from './ITR_func/IncomeSources/CapitalGain';

export default function ITRIncomeSources() {
    const [section, setSection] = useState(sectionList[0]);
    return (
        <>
            <ITRSteps
                steps={sectionList}
                active={section}
                setSection={setSection}
            />
            {section === sectionList[4] ? (
                <CapitalGain />
            ) : section === sectionList[3] ? (
                <BusinessProfession setSection={setSection} />
            ) : section === sectionList[2] ? (
                <OtherIncome setSection={setSection} />
            ) : section === sectionList[1] ? (
                <HouseProperty setSection={setSection} />
            ) : (
                <Salary setSection={setSection} />
            )}
        </>
    );
}

const sectionList = [
    'Salary',
    'House Property',
    'Other Income',
    'Business Profession',
    'Capital Gain',
];
