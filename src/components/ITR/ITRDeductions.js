"use client";
import { useState } from "react";
import ITRSteps from "./ITR_func/ITRSteps.js";
import Section80Deductions from "./ITR_func/Deductions/Section80Deductions.js";
import MoreDeductions from "./ITR_func/Deductions/MoreDeductions.js";
import OtherDeductions from "./ITR_func/Deductions/OtherDeductions.js";

export default function ITRDeductions() {
  const [section, setSection] = useState(sectionList[0]);
  return (
    <>
      <ITRSteps steps={sectionList} active={section} setSection={setSection} />
      {section === sectionList[1] ? (
        <MoreDeductions setSection={setSection} />
      ) : section === sectionList[2] ? (
        <OtherDeductions />
      ) : (
        <Section80Deductions setSection={setSection} />
      )}
    </>
  );
}

const sectionList = [
  "Section 80 Deductions",
  "More Deductions",
  "Other Deductions",
];