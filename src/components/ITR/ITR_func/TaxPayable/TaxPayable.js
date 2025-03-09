"use client";
import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/store/store-context";
import showCurrency from "@/helper/showCurrency";
// import {
//     Image,
//     Document,
//     PDFDownloadLink,
//     Page,
//     Text,
//     View,
//     StyleSheet,
//     PDFViewer,
// } from "@react-pdf/renderer";



// for HUF/AOP/BOI 2018-21
const calculateNetIncomeTaxHUF_AOP_BOI1821 = (income) => {
    if (income <= 250000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
        let tax = (income - 250000) * 0.05;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2 + 12500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
};
// for HUF/AOP/BOI after 2021
const calculateNetIncomeTaxHUF_AOP_BOI21beyond = (income) => {
    if (income <= 250000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
        let tax = (income - 250000) * 0.05;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2 + 12500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000 && income <= 5000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.1
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.15
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.25
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.37
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
};
const huf_calculateNetIncomeTax = (income,AY) => {
    if(AY ==="2018-19" || AY ==="2019-20" || AY ==="2020-21"){
        return calculateNetIncomeTaxHUF_AOP_BOI1821(income);
    }
    else{
        return calculateNetIncomeTaxHUF_AOP_BOI21beyond(income);
    }
    
}


/* Individual */
  // for ay 18-19

  // individual
  const calculateNetIncomeTaxIndividual1819 = (income) => {
    if (income <= 250000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 250000) * 0.05;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 12500;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000 && income <= 5000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let eduCess = inc * 0.03;
      return { taxRate: inc, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.1;
      let eduCess = (inc + sur) * 0.03;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.15;
      let eduCess = (inc + sur) * 0.03;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.25;
      let eduCess = (inc + sur) * 0.03;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 50000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.37;
      let eduCess = (inc + sur) * 0.03;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    }
  };
  // senior citizen
  const calculateNetIncomeTaxSeniorC1819 = (income) => {
    if (income <= 300000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 300000) * 0.05;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 10000;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let inc = (income - 1000000) * 0.3 + 110000;
      let eduCess = inc * 0.03;
      return { taxRate: inc, surcharge: 0, educationCess: eduCess };
    }
  };
  // super senior citizen
  const calculateNetIncomeTaxSuperSeniorC1819 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 500000) * 0.3 + 100000;
      let eduCess = tax * 0.03;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };

  // tax calculation for ay 19-20

    const calculateNetIncomeTaxIndividual1920 = (income) => {
        if (income <= 250000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
        } else if (income <= 350000) {
        let inc = (income - 300000) * 0.05;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income <= 500000) {
        let inc = (income - 250000) * 0.05;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income <= 1000000) {
        let inc = (income - 500000) * 0.2 + 12500;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income > 1000000 && income <= 5000000) {
        let inc = (income - 1000000) * 0.3 + 112500;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income > 5000000 && income <= 10000000) {
        let inc = (income - 1000000) * 0.3 + 112500;
        let sur = inc * 0.1;
        let eduCess = (inc + sur) * 0.04;
        return { taxRate: inc, surcharge: sur, educationCess: eduCess };
        } else if (income > 10000000 && income <= 20000000) {
        let inc = (income - 1000000) * 0.3 + 112500;
        let sur = inc * 0.15;
        let eduCess = (inc + sur) * 0.04;
        return { taxRate: inc, surcharge: sur, educationCess: eduCess };
        } else if (income > 20000000 && income <= 50000000) {
        let inc = (income - 1000000) * 0.3 + 112500;
        let sur = inc * 0.25;
        let eduCess = (inc + sur) * 0.04;
        return { taxRate: inc, surcharge: sur, educationCess: eduCess };
        } else if (income > 50000000) {
        let inc = (income - 1000000) * 0.3 + 112500;
        let sur = inc * 0.37;
        let eduCess = (inc + sur) * 0.04;
        return { taxRate: inc, surcharge: sur, educationCess: eduCess };
        }
    };
    // 19-20 senior citizen
    const calculateNetIncomeTaxSeniorC1920 = (income) => {
        if (income <= 300000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
        } else if (income <= 500000) {
        let inc = (income - 500000) * 0.05;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income <= 1000000) {
        let inc = (income - 500000) * 0.2 + 10000;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income > 1000000) {
        let inc = (income - 1000000) * 0.3 + 110000;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        }
    };
    // 19-20 super senior citizen
    const calculateNetIncomeTaxSuperSeniorC1920 = (income) => {
        if (income <= 500000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
        } else if (income <= 1000000) {
        let inc = (income - 500000) * 0.2;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        } else if (income > 1000000) {
        let inc = (income - 1000000) * 0.3 + 100000;
        let eduCess = inc * 0.04;
        return { taxRate: inc, surcharge: 0, educationCess: eduCess };
        }
    };

  // ay 20-21

  // individual
  const calculateNetIncomeTaxIndividual2021 = (income) => {
    if (income <= 250000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 250000) * 0.05;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 12500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000 && income <= 5000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let eduCess = inc * 0.04;
      return { taxRate: inc, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.1;
      let eduCess = (inc + sur) * 0.04;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.15;
      let eduCess = (inc + sur) * 0.04;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.25;
      let eduCess = (inc + sur) * 0.04;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    } else if (income > 50000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let sur = inc * 0.37;
      let eduCess = (inc + sur) * 0.04;
      return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    }
  };
  // senior citizen
  const calculateNetIncomeTaxSeniorC2021 = (income) => {
    if (income <= 300000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 300000) * 0.05;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 10000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };
  const calculateNetIncomeTaxSuperSeniorC2021 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 100000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };

  // for 21-22

  // individual
  const calculateNetIncomeTaxIndividual2122 = (income) => {
    if (income <= 250000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 250000) * 0.05;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 12500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let inc = (income - 1000000) * 0.3 + 112500;
      let eduCess = inc * 0.04;
      return { taxRate: inc, surcharge: 0, educationCess: eduCess };
    }
    // else if (income > 5000000 && income <= 10000000) {
    //   let inc = (income - 1000000) * 0.3 + 112500;
    //   let sur = inc * 0.1;
    //   let eduCess = (inc + sur) * 0.04;
    //   return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    // } else if (income > 10000000 && income <= 20000000) {
    //   let inc = (income - 1000000) * 0.3 + 112500;
    //   let sur = inc * 0.15;
    //   let eduCess = (inc + sur) * 0.04;
    //   return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    // } else if (income > 20000000 && income <= 50000000) {
    //   let inc = (income - 1000000) * 0.3 + 112500;
    //   let sur = inc * 0.25;
    //   let eduCess = (inc + sur) * 0.04;
    //   return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    // } else if (income > 50000000) {
    //   let inc = (income - 1000000) * 0.3 + 112500;
    //   let sur = inc * 0.37;
    //   let eduCess = (inc + sur) * 0.04;
    //   return { taxRate: inc, surcharge: sur, educationCess: eduCess };
    // }
  };
  // senior citizen
  const calculateNetIncomeTaxSeniorC2122 = (income) => {
    if (income <= 300000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
      let tax = (income - 300000) * 0.05;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 10000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };
  // super senior citizen
  const calculateNetIncomeTaxSuperSeniorC2122 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 100000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };

  // for 22-23 & 23-24

  // // individual from 2.5lac
  // const calculateNetIncomeTaxIndividual2223 = (income) => {
  //   if (income <= 250000) {
  //     return { taxRate: 0, surcharge: 0, educationCess: 0 };
  //   } else if (income <= 500000) {
  //     let tax = (income - 250000) * 0.05;
  //     let eduCess = tax * 0.04;
  //     return { taxRate: tax, surcharge: 0, educationCess: eduCess };
  //   } else if (income <= 750000) {
  //     let tax = (income - 500000) * 0.1 + 12500;
  //     let eduCess = tax * 0.04;
  //     return { taxRate: tax, surcharge: 0, educationCess: eduCess };
  //   } else if (income <= 1000000) {
  //     let tax = (income - 750000) * 0.15 + 37500;
  //     let eduCess = tax * 0.04;
  //     return { taxRate: tax, surcharge: 0, educationCess: eduCess };
  //   } else if (income > 1000000 && income <= 1250000) {
  //     let inc = (income - 1000000) * 0.2 + 75000;
  //     let eduCess = inc * 0.04;
  //     return { taxRate: inc, surcharge: 0, educationCess: eduCess };
  //   } else if (income > 1250000 && income <= 15000000) {
  //     let inc = (income - 1250000) * 0.25 + 125000;
  //     let sur = inc * 0.1;
  //     let eduCess = (inc + sur) * 0.04;
  //     return { taxRate: inc, surcharge: sur, educationCess: eduCess };
  //   } else if (income > 15000000) {
  //     let inc = (income - 15000000) * 0.3 + 187500;
  //     let sur = inc * 0.15;
  //     let eduCess = (inc + sur) * 0.04;
  //     return { taxRate: inc, surcharge: sur, educationCess: eduCess };
  //   }
  // };
  // individual with starting from 5lac
  const calculateNetIncomeTaxIndividual2223 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 12500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };

  // senior citizen
  const calculateNetIncomeTaxSeniorC2223 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 10000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }else if (income > 5000000 && income <= 10000000 ) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let scharge = tax * 0.1
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if (income > 10000000 && income <= 20000000 ) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let scharge = tax * 0.15
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if (income > 20000000 && income <= 50000000 ) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let scharge = tax * 0.25
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if ( income > 50000000 ) {
      let tax = (income - 1000000) * 0.3 + 110000;
      let scharge = tax * 0.37
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
  };
  // super senior citizen
  const calculateNetIncomeTaxSuperSeniorC2223 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 1000000) {
      let tax = (income - 1000000) * 0.3 + 100000;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }
  };

  
  // individual- after 5lac
  const calculateNetIncomeTaxIndividual2324 = (income) => {
    if (income <= 500000) {
      return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
      let tax = (income - 500000) * 0.2 + 12500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let eduCess = tax * 0.04;
      return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    }else if (income > 5000000 && income <= 10000000 ) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let scharge = tax * 0.1
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if (income > 10000000 && income <= 20000000 ) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let scharge = tax * 0.15
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if (income > 20000000 && income <= 50000000 ) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let scharge = tax * 0.25
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }else if ( income > 50000000 ) {
      let tax = (income - 1000000) * 0.3 + 112500;
      let scharge = tax * 0.37
      let eduCess = (tax+scharge) * 0.04;
      return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
  };





 // for individual 24-25

// individual with starting from 5lac
const calculateNetIncomeTaxIndividual2425 = (income) => {
    if (income <= 500000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2 + 12500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.1
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.15
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.25
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let scharge = tax * 0.37
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
};

// senior citizen
const calculateNetIncomeTaxSeniorC2425 = (income) => {

    if (income <= 500000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2 + 10000;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
        let tax = (income - 1000000) * 0.3 + 110000;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
        let tax = (income - 1000000) * 0.3 + 110000;
        let scharge = tax * 0.1
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
        let tax = (income - 1000000) * 0.3 + 110000;
        let scharge = tax * 0.15
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
        let tax = (income - 1000000) * 0.3 + 110000;
        let scharge = tax * 0.25
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 50000000) {
        let tax = (income - 1000000) * 0.3 + 110000;
        let scharge = tax * 0.37
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
};
// super senior citizen
const calculateNetIncomeTaxSuperSeniorC2425 = (income) => {
    if (income <= 500000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
        let tax = (income - 1000000) * 0.3 + 100000;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
        let tax = (income - 1000000) * 0.3 + 100000;
        let scharge = tax * 0.1
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
        let tax = (income - 1000000) * 0.3 + 100000;
        let scharge = tax * 0.15
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
        let tax = (income - 1000000) * 0.3 + 100000;
        let scharge = tax * 0.25
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    } else if (income > 50000000) {
        let tax = (income - 1000000) * 0.3 + 100000;
        let scharge = tax * 0.37
        let eduCess = (tax + scharge) * 0.04;
        return { taxRate: tax, surcharge: scharge, educationCess: eduCess };
    }
};

const individual_calc = (income,AY,gender,residential_status) => {
    let taxValue;
    if (AY === "2019-20") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual1920(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC1920(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC1920(
                income
            );
        }
    } else if (AY === "2018-19") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual1819(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC1819(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC1819(
                income
            );
        }
    } else if (AY === "2020-21") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual2021(income);
            console.log("inside 20-21 taxvalue", taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC2021(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC2021(
                income
            );
        }
    } else if (AY === "2021-22") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual2122(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            // check for between not ordinary and senior C
            taxValue = calculateNetIncomeTaxSeniorC2122(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC2122(
                income
            );
        }
    } else if (AY === "2022-23") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual2223(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC2223(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC2223(
                income
            );
        }
    } else if (AY === "2023-24") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual2324(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC2223(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC2223(
                income
            );
        }
    } else if (AY === "2024-25") {
        if (
            gender === "male" ||
            gender === "female" ||
            (gender === "senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident") ||
            (gender === "super_senior_citizen" &&
                residential_status !== "resident" &&
                residential_status !== "not_ordinary_resident")
        ) {
            taxValue = calculateNetIncomeTaxIndividual2425(income);
            console.log(taxValue);
        } else if (gender === "senior_citizen") {
            taxValue = calculateNetIncomeTaxSeniorC2425(income);
        } else if (gender === "super_senior_citizen") {
            taxValue = calculateNetIncomeTaxSuperSeniorC2425(
                income
            );
        }
    }
    return taxValue;
}





export default function TaxPayable() {
    const [state, dispatch] = useContext(StoreContext);
    const [calculatedTax, setCalculatedTax] = useState({});
    const {itr_AY,taxPayerType} = state.itr?.incomeSources;
    const Gender = state.itr.personalInfo.personalInfo?.gender;
    const router = useRouter();

    const incomeChargeableUnderTheHeadSalaries = state.itr.incomeSources.salary.salaryInformation.incomeChargeableUnderTheHeadSalaries;
    const incomeFromOtherSources = state.itr.incomeSources.otherIncome.totalOfAllOtherIncome;
    const headhouseProperty = state.itr.incomeSources.houseProperty.incomeChargeableUnderTheHeadHouseProperty || 0;

    const section80cDeduction = state.itr.deductions.section80Deductions.totalDeduction;
    const section80dDeduction = state.itr.deductions.moreDeductions.amountOfTotalMoreDeductions;
    const section80ddDeduction = state.itr.deductions.otherDeductions.amountOfTotalOtherDeductions;

    const RATE_1 = 0.0;
    const RATE_2 = 0.05;
    const RATE_3 = 0.1;
    const RATE_4 = 0.15;
    const RATE_5 = 0.2;
    const RATE_6 = 0.25;
    const RATE_7 = 0.3;

    const CESS = 0.04;

    const LIMIT_1 = 250000;
    const LIMIT_2 = 500000;
    const LIMIT_3 = 750000;
    const LIMIT_4 = 1000000;
    const LIMIT_5 = 1250000;
    const LIMIT_6 = 1500000;

    // const isForm_16 = state.itr_type.form16_type;
    // if (isForm_16) {
    //   taxPayable = calculateTax(taxableIncome);
    // }

    const totalDeduction = () => {
        return (
            Number(section80cDeduction) + Number(section80dDeduction) + Number(section80ddDeduction));
    };
    const totalGrossIncome = () => {
        return (
            Number(incomeChargeableUnderTheHeadSalaries) + Number(incomeFromOtherSources) + Number(headhouseProperty)
        );
    };

    const totalIncome = () => {
        return Number(totalGrossIncome()) - Number(totalDeduction());
    };

    const taxAbleIncome = totalIncome();

    // console.log(taxAbleIncome)
    const calculateTax = (income) => {
        let tax = 0;
        if (income <= LIMIT_1) {
            tax = RATE_1 * income;
        } else if (income <= LIMIT_2) {
            tax = RATE_2 * (income - LIMIT_1);
        } else if (income <= LIMIT_3) {
            tax = RATE_3 * (income - LIMIT_2) + calculateTax(LIMIT_2);
        } else if (income <= LIMIT_4) {
            tax = RATE_4 * (income - LIMIT_3) + calculateTax(LIMIT_3);
        } else if (income <= LIMIT_5) {
            tax = RATE_5 * (income - LIMIT_4) + calculateTax(LIMIT_4);
        } else if (income <= LIMIT_6) {
            tax = RATE_6 * (income - LIMIT_5) + calculateTax(LIMIT_5);
        } else {
            tax = RATE_7 * (income - LIMIT_6) + calculateTax(LIMIT_6);
        }
        tax = tax + CESS * tax;
        return tax;
    };
    useEffect(() => {
        if (taxPayerType==="General"){
            setCalculatedTax(individual_calc(taxAbleIncome,itr_AY,Gender,taxPayerType));
        }else{
            setCalculatedTax(huf_calculateNetIncomeTax(taxAbleIncome,itr_AY));
        }
    },[taxAbleIncome,itr_AY,Gender,taxPayerType])
    return (
        <div>
            <div>
                <div
                    className={`
            mx-auto
             sm:max-w-xl
             md:max-w-2xl
             lg:max-w-3xl
            sm:px-8
            px-4
            md:text-base
            text-sm

            [&_div]:flex
            [&_div]:px-3
            [&_div]:justify-between
            [&_div]:my-4
        `}
                >
                    <h2 className="text-3xl text-center font-bold bg-primary text-white rounded-sm rounded-t-md p-2">
                        Tax Payable
                    </h2>
                    <ul className="[&>li]:flex [&>li]:justify-between [&>li]:flex-wrap">
                        <li className="mb-2 underline">
                            Assessment Year: <span className="font-semibold text-gray-800">{itr_AY}</span>
                        </li>
                        <li className="mb-2 underline">
                            Tax Payer Type: <span className="font-semibold text-gray-800">{taxPayerType==="General"?"Individual":taxPayerType}</span>
                        </li>
                    </ul>
                    <div className="rounded-md font-bold bg-primary text-white py-3">
                        <span>Gross Total Income</span>
                        <span>{"Amount"}</span>
                    </div>
                    <div>
                        <span>
                            {" "}
                            (1) Income Chargable Under the Head
                            &quot;Salaries&quot;
                        </span>
                        <span>
                            {incomeChargeableUnderTheHeadSalaries.toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <span>
                            {" "}
                            (2) Income Chargable Under the Head House Property
                        </span>
                        <span>{headhouseProperty.toLocaleString()}</span>
                    </div>
                    <div>
                        <span> (3) Income From Other Sources</span>
                        <span>{incomeFromOtherSources.toLocaleString()}</span>
                    </div>
                    <div className="font-bold">
                        <span>(A) Gross Total Income (1+2+3)</span>
                        <span>
                            {totalGrossIncome().toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                    <div className="font-bold bg-primary py-3 text-white rounded-md">
                        <span>Deductions And Taxable Income</span>
                        <span>Amount</span>
                    </div>
                    <div>
                        <span>Section 80C and others..</span>
                        <span>{section80cDeduction.toLocaleString()}</span>
                    </div>
                    <div>
                        <span>Section 80D and others..</span>
                        <span>{section80dDeduction.toLocaleString()}</span>
                    </div>
                    <div>
                        <span>Section 80DD and others..</span>
                        <span>{section80ddDeduction.toLocaleString()}</span>
                    </div>
                    <div className="font-bold">
                        <span>(B) Total Deductions:</span>
                        <span>{totalDeduction().toLocaleString()}</span>
                    </div>
                    <div className="font-bold">
                        <span>Total Income (A) - (B) :</span>
                        <span>
                            {totalIncome().toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                    {/* <div className="font-bold">
                        <span>Total Tax Liability (including cess):</span>
                        <span>
                            {calculateTax(taxAbleIncome).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 2,
                                },
                            )}
                        </span>
                    </div> */}
                </div>
            </div>
            <ul className="mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-8 sm:px-8 space-y-4 bg-gray-200 p-2">
                <li className="font-bold px-4 flex justify-between">
                    Income Tax after relief u/s 87A: <span>{showCurrency(calculatedTax?.taxRate||0)}</span>
                </li>
                <li className="font-bold px-4 flex justify-between">
                    Surcharge: <span>{showCurrency(calculatedTax?.surcharge||0)}</span>
                </li>
                <li className="font-bold px-4 flex justify-between">
                    Cess : <span>{showCurrency(calculatedTax?.educationCess||0)}</span>
                </li>
                <li className="font-bold px-4 flex justify-between">
                    Total Tax Liability (including cess): <span>{showCurrency(calculatedTax?.taxRate + calculatedTax?.surcharge + calculatedTax?.educationCess||0)}</span>
                </li>
                
            </ul>
            {/* <div className="flex gap-3 justify-center">
                <button
                    className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer"
                    onClick={() =>
                        router.push("/dashboard/itr/itr-filling/taxes-paid")
                    }
                >
                    Submit
                </button>
                <PDFDownloadLink
                    document={<ITR1PDF />}
                    fileName="itr-1"
                    className="bg-primary w-max px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download PDF"
                    }
                </PDFDownloadLink>
            </div> */}
        </div>
    );
}

// const ITR1PDF = () => {
//     const styles = StyleSheet.create({
//         viewer: {
//             width: window.innerWidth,
//             height: window.innerHeight,
//         },
//         page: {
//             backgroundColor: "white",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "black",
//             padding: "20px",
//         },
//         img: {
//             objectFit: "cover",
//         },
//     });

//     return (
//         <Document>
//             <Page>
//                 <View>
//                     <Text>www.itaxeasy.com</Text>
//                     <Text>Email : info@itaxeasy.com</Text>
//                 </View>
//             </Page>
//         </Document>
//     );
// };
