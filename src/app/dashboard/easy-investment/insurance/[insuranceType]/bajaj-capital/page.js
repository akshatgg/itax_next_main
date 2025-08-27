import { InputStyles } from "@/app/styles/InputStyles";
import BajajCapital_dashboard from "@/components/pagesComponents/dashboard/easyInvestment/insurance/selectInsurance/bajajCapital/BajajCapital_dashboard";
import BajajCapitalForm from "@/components/pagesComponents/dashboard/user/easyInvestment/insurance/general/BajajCapitalForm";
import PrivateRoute from "@/helper/PrivateAccess";
import Image from "next/image";

function FormBrand_user() {
  return (
    <div className={InputStyles.insuranceWrapper} >
      <div className={InputStyles.bajajcards}>
        <div className={InputStyles.bajajleftcard}>
          <div className="absolute -top-6 -left-6 bg-white rounded-full border-2 border-blue-300 shadow-md p-2">
            <Image
              src="/logo.svg"
              alt="Top corner logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>
          <Image
            className="w-24 h-24 object-contain"
            width={100}
            height={100}
            src="/logo.svg"
            alt="ItaxEasy logo"
            priority
          />

          {/* Tagline */}
          <h3 className="font-bold text-2xl sm:text-3xl text-gray-800 leading-snug">
            Empowering Dreams, <br />
            Ensuring <span className="text-red-500">Security</span>
          </h3>
          <div className={InputStyles.topleftimage}>
            <Image
              className="mix-blend-multiply w-10 h-10"
              width={40}
              height={40}
              src="/dashboard/easyInvestment/insurance/bajaj_logo_icon.png"
              alt="bajaj_capital-logo"
            />
            <h2 className={InputStyles.bajajh2}>
              Bajaj Capital
            </h2>
          </div>
        </div>
        <div className={InputStyles.bajajrightcard}>
          <h2 className={InputStyles.sectionTitle}>
            Apply for Insurance
          </h2>

          {/* Form */}
          <BajajCapitalForm />
        </div>
      </div>
    </div>
  );
}

export default function insurance() {
  return (
    <PrivateRoute 
      Admin={BajajCapital_dashboard}
      Normal={FormBrand_user}
    />
  );
}
