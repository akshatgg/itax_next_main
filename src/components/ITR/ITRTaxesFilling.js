"use client";
import { useState } from "react";
import ITRSteps from "./ITR_func/ITRSteps";
import MoreInfo from "./ITR_func/TaxeFiling/MoreInfo";
import EFiling from "./ITR_func/TaxeFiling/EFiling";

export default function ITRTaxesFilling() {
  const [section, setSection] = useState(sectionList[0]);
  return (
    <>
      <ITRSteps steps={sectionList} active={section} setSection={setSection} />
      {section === sectionList[1] ? (
        <EFiling />
      ) : (
        <MoreInfo setSection={setSection} />
      )}
    </>
  );
}

const sectionList = ["Info", "E-Filing"];