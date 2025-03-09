"use client"
import React, { useContext, useState } from "react";
import ITRSteps from "./ITR_func/ITRSteps";
import TaxPayable from "./ITR_func/TaxPayable/TaxPayable";
import { StoreContext } from "@/store/store-context";

export default function ITRTaxPayAble () {
  const [state, dispatch] = useContext(StoreContext);
  const [section, setSection] = useState(sectionList[0]);
  const isFormType_16 = state.itr_type.form16_type;

  return (
    <>
      <div>
        {/* <ITRSteps
          steps={sectionList}
          active={section}
          setSection={setSection}
        /> */}
        {section === sectionList[0] ? <TaxPayable setSection={setSection} /> : null}
      </div>
    </>
  );
};

const sectionList = ["Tax Payable"];