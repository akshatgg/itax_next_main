import BajajCapital_dashboard from "@/components/pagesComponents/dashboard/easyInvestment/insurance/selectInsurance/bajajCapital/BajajCapital_dashboard";
import BajajCapitalForm from "@/components/pagesComponents/dashboard/user/easyInvestment/insurance/general/BajajCapitalForm";
import PrivateRoute from "@/helper/PrivateAccess";
import Image from "next/image";
function FormBrand_user() {
  return (
    <div className="p-4 pt-12 pb-24 grid lg:grid-cols-2 container mx-auto">
        <div className=" grid place-content-center gap-2 justify-center">
            <div className="grid place-content-center">
                <Image
                    className="w-full max-w-36 mx-auto "
                    width={100}
                    height={100}
                    src="/logo.svg"
                    alt="ItaxEasy logo"
                    priority
                />
            </div>
            <h3 className="font-bold text-2xl text-center leading-snug">
                Empowering Dreams, Ensuring Security
                <br />
            Your  with Bajaj Insurance Capital.
                <span className="font-extrabold text-4xl block mt-3">
                Trusted Partner
                </span>
            </h3>
            <div className="grid place-content-center p-4">
                <div className="flex gap-3 items-center justify-center">
                    <Image className="mix-blend-multiply" width={40} height={40} src="/dashboard/easyInvestment/insurance/bajaj_logo_icon.png" alt="bajaj_capital-logo.png" />
                    <h1 className="py-3 px-4 text-3xl font-bold rounded-sm text-red-600">Bajaj Capital</h1>
                </div>
            </div>
        </div>
        <div className="max-w-3xl mx-auto">
            <BajajCapitalForm />
        </div>
    </div>
  );
}
export default function insurance() {

    return(
        <PrivateRoute 
            Admin={BajajCapital_dashboard}
            Normal={FormBrand_user}
        />
    )
}
