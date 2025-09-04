import { InputStyles } from "@/app/styles/InputStyles";

export default function MoreInfo() {

  return (
  <div
  //  className="mx-auto px-6 py-6 bg-white rounded-2xl shadow-md max-w-4xl w-full"
  className={InputStyles.section80Deduction}
   >
  <h6
  // className="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
   className={InputStyles.section80Deductiontitle}
 >
    [Optional] Advanced Info — Only Required in a Few Cases
  </h6>
  <p className="text-sm text-gray-700 mb-2">
    These sections are not required in most cases.
  </p>
  <p className="text-sm text-gray-700 mb-2">
    If any of these details are applicable to you, enter the details below.
    Else click <span className="font-semibold">"Go to Next"</span>.
  </p>
  <p className="text-sm text-gray-700 mt-4 mb-3 font-medium">
    Are any of the following applicable to you? If not, you can skip this section.
  </p>
  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 pl-1">
    <li>You are a NRI or have spent time outside India.</li>
    <li>You own shares of an Unlisted company (shares that are not listed on any stock exchange).</li>
    <li>You are a Director of any company in India.</li>
    <li>You are a resident and have Foreign Assets or Income or you have paid taxes outside India.</li>
    <li>You have total income more than ₹50 Lakhs.</li>
    <li>You have deposited more than ₹1 crore in one or more current accounts during the previous year.</li>
    <li>You have incurred expenditure of more than ₹1 Lakh on electricity or over ₹2 Lakhs on foreign travel.</li>
  </ul>
</div>

  );
}
