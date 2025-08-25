import React from 'react';
import CustomButton from '../GSTRHomeComponent/CustomButton';
import CustomText from '../GSTRHomeComponent/CustomText';
import Header from '../GSTRHomeComponent/Header';
import CustomInput from '../GSTRHomeComponent/CustomInput';
import CustomLabel from '../GSTRHomeComponent/CustomLabel';

const GSTRPermanentInfo = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6 max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center p-4 mb-4 bg-white rounded-2xl shadow-sm border">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <h2 className="text-base text-blue-900 font-semibold">
              Registration Status:
            </h2>
            <h2 className="text-base text-gray-800">
              Registered & Active as Regular taxpayer
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <CustomText variant="news" className="text-xs text-red-600">
              * Important Amendment for GSTN
            </CustomText>
            <CustomText variant="news" className="text-xs text-orange-600">
              * Important Details from GSTN
            </CustomText>
          </div>
          <CustomButton className="ml-4">Registration Details</CustomButton>
        </div>

        <hr className="h-px my-4 bg-gray-300 border-0" />

        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <form>

            {/* Basic Info */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <CustomLabel htmlFor="gstn">
                  GSTN (Registration Number)
                </CustomLabel>
                <CustomInput
                  type="text"
                  id="gstn"
                  placeholder="GSTN"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <CustomLabel htmlFor="last_name">
                  Legal Name As Per PAN
                </CustomLabel>
                <div className="flex items-center mt-1">
                  <CustomInput
                    type="text"
                    id="last_name"
                    placeholder="Full Name"
                    required
                    className="flex-1"
                  />
                  <CustomButton type="button" variant="inputbutton" className="ml-2">
                    Edit
                  </CustomButton>
                </div>
              </div>
              <div>
                <CustomLabel htmlFor="company">PAN Of Business</CustomLabel>
                <CustomInput
                  type="text"
                  id="company"
                  placeholder="Flowbite"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <CustomLabel htmlFor="phone">Trade Name (Optional)</CustomLabel>
                <CustomInput
                  type="tel"
                  id="phone"
                  placeholder="Trade Name"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <CustomInput
                  type="dropdown"
                  id="website"
                  placeholder="Constitution/ states of Business :"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                  className="mt-1"
                />
              </div>

              {/* State + Country */}
              <div className="grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="dropdown"
                  id="website"
                  placeholder="State"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
                <CustomInput
                  type="dropdown"
                  id="website"
                  placeholder="Country"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
              </div>

              {/* Communication + Bank */}
              <div>
                <div className="flex items-center">
                  <CustomInput
                    type="dropdown"
                    id="website"
                    placeholder="Communication Address :"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' },
                    ]}
                  />
                  <CustomButton type="button" className="ml-2" variant="inputbutton">
                    ...
                  </CustomButton>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <CustomInput
                    type="dropdown"
                    id="website"
                    placeholder="Bank Detail"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' },
                    ]}
                  />
                  <CustomButton type="button" className="ml-2" variant="inputbutton">
                    Edit
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Registration Info */}
            <div className="grid gap-4 mb-6 md:grid-cols-3 text-sm">
              <CustomLabel htmlFor="last_name">Registration Date :</CustomLabel>
              <CustomLabel htmlFor="last_name">
                Registration Cancellation Date
              </CustomLabel>
              <CustomLabel htmlFor="last_name">
                Is Newly migrated taxpayer
              </CustomLabel>
            </div>

            <hr className="h-1 my-6 bg-gray-300 border-0" />

            {/* Turnover Info */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <CustomLabel htmlFor="gstn">
                  Aggregate Turnover in the preceding FY
                </CustomLabel>
                <CustomInput type="text" id="gstn" placeholder="GSTN" required />
              </div>
              <div>
                <CustomLabel htmlFor="gstn">
                  Pan Base aggregate Turnover in the preceding FY
                </CustomLabel>
                <CustomInput type="text" id="gstn" placeholder="GSTN" required />
              </div>
              <div>
                <CustomInput
                  type="dropdown"
                  id="website"
                  placeholder="Registration Opted As(Update Manually)"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomButton>QRMP Preference Setting</CustomButton>
                <CustomInput />
              </div>
            </div>

            {/* Auditor */}
            <div className="flex items-center mb-6">
              <CustomInput
                type="dropdown"
                id="website"
                placeholder="Select auditor (From 9C)"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
              />
              <CustomButton type="button" className="ml-2" variant="inputbutton">
                Edit
              </CustomButton>
            </div>

            {/* Authorized Person */}
            <div className="grid gap-4 mb-6 md:grid-cols-6 items-center text-center">
              <CustomLabel htmlFor="company" variant="warning">
                Primary Authorized Person
              </CustomLabel>
              <CustomInput type="text" id="company" placeholder="Name" required />
              <CustomInput type="text" id="company" placeholder="PAN" required />
              <CustomInput type="text" id="company" placeholder="AADHAR" required />
              <CustomInput type="text" id="company" placeholder="Mobile (For OTP)" required />
              <CustomInput type="text" id="company" placeholder="EMAIL (For OTP)" required />
            </div>



            <hr className="h-1 my-4 bg-gray-400 border-0 dark:bg-gray-800" />
            <div className="flex justify-center">
              <CustomLabel
                variant="heading"
                className="text-red-600 dark:text-red-500 text-3xl text-center"
              >
                GSTR-2A Reconciliation Summary Options
              </CustomLabel>
            </div>

            <div className="grid gap-4 mb-4 md:grid-cols-2 mt-4">
              <div>
                <CustomLabel htmlFor="company">
                  Ignore Difference upto Rs/-(if invoice no. match)
                </CustomLabel>
                <CustomInput
                  type="text"
                  id="company"
                  placeholder="Amount"
                  required
                />
              </div>
              <div>
                <CustomLabel htmlFor="company">
                  Ignore string from invoice Number :
                </CustomLabel>
                <CustomInput
                  type="text"
                  id="company"
                  placeholder="Amount"
                  required
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <CustomInput id="remember" type="checkbox" required />
                </div>
                <CustomLabel htmlFor="remember" className="ms-2">
                  Do not Ignore invoice number while comparision
                </CustomLabel>
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <CustomInput id="remember" type="checkbox" required />
                </div>
                <CustomLabel htmlFor="remember" className="ms-2">
                  Use GSTR-2A unfiled records while comparision
                </CustomLabel>
              </div>
            </div>
            <hr className="h-1 my-4 bg-gray-400 border-0 dark:bg-gray-800" />
            <div className="flex justify-center">
              <CustomLabel
                variant="heading"
                className="text-red-600 dark:text-red-500 text-3xl text-center"
              >
                Other Options
              </CustomLabel>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <CustomInput id="remember" type="checkbox" required />
              </div>
              <CustomLabel htmlFor="remember" className="ms-2">
                Trick if you want to use only annual return in software and
                completely ignore monthly/quarterly returns
              </CustomLabel>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <CustomInput id="remember" type="checkbox" required />
              </div>
              <CustomLabel htmlFor="remember" className="ms-2">
                Enable E-Invoice QR Dynamice QR Code Settings
              </CustomLabel>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <CustomInput id="remember" type="checkbox" required />
              </div>
              <CustomLabel htmlFor="remember" className="ms-2">
                Round off invoice value
              </CustomLabel>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GSTRPermanentInfo;


// import React from 'react';
// import CustomButton from '../GSTRHomeComponent/CustomButton';
// import CustomText from '../GSTRHomeComponent/CustomText';
// import Header from '../GSTRHomeComponent/Header';
// import CustomInput from '../GSTRHomeComponent/CustomInput';
// import CustomLabel from '../GSTRHomeComponent/CustomLabel';

// const GSTRPermanentInfo = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <div className="p-6 max-w-7xl mx-auto">

//         {/* Top Section */}
//         <div className="flex flex-wrap justify-between items-center p-4 mb-4 bg-white rounded-2xl shadow-sm border">
//           <div className="flex flex-col sm:flex-row items-center gap-2">
//             <h2 className="text-base text-blue-900 font-semibold">
//               Registration Status:
//             </h2>
//             <h2 className="text-base text-gray-800">
//               Registered & Active as Regular taxpayer
//             </h2>
//           </div>
//           <div className="flex flex-col sm:flex-row items-center gap-3">
//             <CustomText variant="news" className="text-xs text-red-600">
//               * Important Amendment for GSTN
//             </CustomText>
//             <CustomText variant="news" className="text-xs text-orange-600">
//               * Important Details from GSTN
//             </CustomText>
//           </div>
//           <CustomButton className="ml-4">Registration Details</CustomButton>
//         </div>

//         <hr className="h-px my-4 bg-gray-300 border-0" />

//         {/* Form Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border">
//           <form>

//             {/* Basic Info */}
//             <div className="grid gap-6 mb-6 md:grid-cols-2">
//               <div>
//                 <CustomLabel htmlFor="gstn">
//                   GSTN (Registration Number)
//                 </CustomLabel>
//                 <CustomInput
//                   type="text"
//                   id="gstn"
//                   placeholder="GSTN"
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <CustomLabel htmlFor="last_name">
//                   Legal Name As Per PAN
//                 </CustomLabel>
//                 <div className="flex items-center mt-1">
//                   <CustomInput
//                     type="text"
//                     id="last_name"
//                     placeholder="Full Name"
//                     required
//                     className="flex-1"
//                   />
//                   <CustomButton type="button" variant="inputbutton" className="ml-2">
//                     Edit
//                   </CustomButton>
//                 </div>
//               </div>
//               <div>
//                 <CustomLabel htmlFor="company">PAN Of Business</CustomLabel>
//                 <CustomInput
//                   type="text"
//                   id="company"
//                   placeholder="Flowbite"
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <CustomLabel htmlFor="phone">Trade Name (Optional)</CustomLabel>
//                 <CustomInput
//                   type="tel"
//                   id="phone"
//                   placeholder="Trade Name"
//                   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <CustomInput
//                   type="dropdown"
//                   id="website"
//                   placeholder="Constitution/ states of Business :"
//                   options={[
//                     { value: 'option1', label: 'Option 1' },
//                     { value: 'option2', label: 'Option 2' },
//                     { value: 'option3', label: 'Option 3' },
//                   ]}
//                   className="mt-1"
//                 />
//               </div>

//               {/* State + Country */}
//               <div className="grid gap-6 md:grid-cols-2">
//                 <CustomInput
//                   type="dropdown"
//                   id="website"
//                   placeholder="State"
//                   options={[
//                     { value: 'option1', label: 'Option 1' },
//                     { value: 'option2', label: 'Option 2' },
//                     { value: 'option3', label: 'Option 3' },
//                   ]}
//                 />
//                 <CustomInput
//                   type="dropdown"
//                   id="website"
//                   placeholder="Country"
//                   options={[
//                     { value: 'option1', label: 'Option 1' },
//                     { value: 'option2', label: 'Option 2' },
//                     { value: 'option3', label: 'Option 3' },
//                   ]}
//                 />
//               </div>

//               {/* Communication + Bank */}
//               <div>
//                 <div className="flex items-center">
//                   <CustomInput
//                     type="dropdown"
//                     id="website"
//                     placeholder="Communication Address :"
//                     options={[
//                       { value: 'option1', label: 'Option 1' },
//                       { value: 'option2', label: 'Option 2' },
//                       { value: 'option3', label: 'Option 3' },
//                     ]}
//                   />
//                   <CustomButton type="button" className="ml-2" variant="inputbutton">
//                     ...
//                   </CustomButton>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center">
//                   <CustomInput
//                     type="dropdown"
//                     id="website"
//                     placeholder="Bank Detail"
//                     options={[
//                       { value: 'option1', label: 'Option 1' },
//                       { value: 'option2', label: 'Option 2' },
//                       { value: 'option3', label: 'Option 3' },
//                     ]}
//                   />
//                   <CustomButton type="button" className="ml-2" variant="inputbutton">
//                     Edit
//                   </CustomButton>
//                 </div>
//               </div>
//             </div>

//             {/* Registration Info */}
//             <div className="grid gap-4 mb-6 md:grid-cols-3 text-sm">
//               <CustomLabel htmlFor="last_name">Registration Date :</CustomLabel>
//               <CustomLabel htmlFor="last_name">
//                 Registration Cancellation Date
//               </CustomLabel>
//               <CustomLabel htmlFor="last_name">
//                 Is Newly migrated taxpayer
//               </CustomLabel>
//             </div>

//             <hr className="h-1 my-6 bg-gray-300 border-0" />

//             {/* Turnover Info */}
//             <div className="grid gap-6 mb-6 md:grid-cols-2">
//               <div>
//                 <CustomLabel htmlFor="gstn">
//                   Aggregate Turnover in the preceding FY
//                 </CustomLabel>
//                 <CustomInput type="text" id="gstn" placeholder="GSTN" required />
//               </div>
//               <div>
//                 <CustomLabel htmlFor="gstn">
//                   Pan Base aggregate Turnover in the preceding FY
//                 </CustomLabel>
//                 <CustomInput type="text" id="gstn" placeholder="GSTN" required />
//               </div>
//               <div>
//                 <CustomInput
//                   type="dropdown"
//                   id="website"
//                   placeholder="Registration Opted As(Update Manually)"
//                   options={[
//                     { value: 'option1', label: 'Option 1' },
//                     { value: 'option2', label: 'Option 2' },
//                     { value: 'option3', label: 'Option 3' },
//                   ]}
//                 />
//               </div>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <CustomButton>QRMP Preference Setting</CustomButton>
//                 <CustomInput />
//               </div>
//             </div>

//             {/* Auditor */}
//             <div className="flex items-center mb-6">
//               <CustomInput
//                 type="dropdown"
//                 id="website"
//                 placeholder="Select auditor (From 9C)"
//                 options={[
//                   { value: 'option1', label: 'Option 1' },
//                   { value: 'option2', label: 'Option 2' },
//                   { value: 'option3', label: 'Option 3' },
//                 ]}
//               />
//               <CustomButton type="button" className="ml-2" variant="inputbutton">
//                 Edit
//               </CustomButton>
//             </div>

//             {/* Authorized Person */}
//             <div className="grid gap-4 mb-6 md:grid-cols-6 items-center text-center">
//               <CustomLabel htmlFor="company" variant="warning">
//                 Primary Authorized Person
//               </CustomLabel>
//               <CustomInput type="text" id="company" placeholder="Name" required />
//               <CustomInput type="text" id="company" placeholder="PAN" required />
//               <CustomInput type="text" id="company" placeholder="AADHAR" required />
//               <CustomInput type="text" id="company" placeholder="Mobile (For OTP)" required />
//               <CustomInput type="text" id="company" placeholder="EMAIL (For OTP)" required />
//             </div>


//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GSTRPermanentInfo;
