"use client";
import { useContext, useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import { toast } from "react-toastify";
import { panRegex, aadharRegex } from "../../../regexPatterns";
import { useFormik } from "formik";
import * as Yup from "yup";
import userAxios from "@/lib/userAxios";
import { InputStyles } from "@/app/styles/InputStyles";
export default function PresonalInfo({ setSection,userProfile }) {
    
    const { token } = useAuth();
    const [state, dispatch] = useContext(StoreContext);
    const info = state.itr.personalInfo.personalInfo;
    const [isAadharLinked, setIsAadharLinked] = useState(false);

    const handleSubmit = (values) => {
        dispatch({
            type: Actions.ITR,
            payload: {
                ...state.itr,
                personalInfo: {
                    ...state.itr.personalInfo,
                    personalInfo: {
                        panNumber: values.pan,
                        firstName: values.firstName,
                        middleName: values.middleName,
                        lastName: values.lastName,
                        gender: values.gender,
                        dob: values.dateOfBirth,
                        fathersName: values.fatherName,
                        aadhaarCardNumber: values.aadhaar,
                    },
                },
            },
        });
        setSection("Bank Details");
    };
    // console.log(userProfile)

    const formik = useFormik({
        initialValues: {
            pan: info.panNumber || userProfile?.pan || "",
            aadhaar: info.aadhaarCardNumber || userProfile?.aadhaar || "",
            firstName: info.firstName || userProfile?.firstName || "",
            middleName: info.middleName || userProfile?.middleName || "",
            lastName: info.lastName || userProfile?.lastName || "",
            gender: info.gender || userProfile?.gender || "",
            dateOfBirth: info.dob || userProfile?.dob || "",
            fatherName: info.fathersName || userProfile?.fathersName || "",
        },
        validationSchema: Yup.object({
            pan: Yup.string().required("PAN Card is Required").matches(panRegex, "Invalid Pan Card Number"),
            aadhaar: Yup.string().matches(aadharRegex, "Invalid Aadhaar Card"),
            firstName: Yup.string(),
            middleName: Yup.string(),
            lastName: Yup.string(),
            gender: Yup.string(),
            dateOfBirth: Yup.string(),
            fatherName: Yup.string(),
        }),

        onSubmit: (values) => handleSubmit(values),
    });

    const fetchPan = async () => {
        if (!token) {
            return toast("Login to fetch PAN details,Please login", { type: "error" });
        }

        try {
            const res = await userAxios.get("/pan/get-pan-details?pan=" +formik.values.pan,);
            const {data: { status, full_name, aadhaar_seeding_status },} = await res.data;

            //setting if PAN is valid -
            if (status === "VALID") {
                toast("Valid PAN Card", { type: "success" });
            }

            aadhaar_seeding_status === "Y"
                ? setIsAadharLinked(true)
                : setIsAadharLinked(false);

            const fullName = full_name;
            const allNames = fullName && fullName.split(" ");

            formik.setFieldValue("firstName", allNames[0]);
            formik.setFieldValue("middleName", allNames[1]);
            formik.setFieldValue("lastName", allNames[2]);
        } catch (err) {
            toast("Error in fetching PAN", { type: "error" });
            console.log(err);
        }
    };

    const fetchAadhaar = async () => {
        if (!token) {
            return toast("Login to fetch Aadhar details", { type: "error" });
        }
        const res = await userAxios.get("pan/verify_aadhar?aadhar=" +formik.values.aadhaar,);
        const { data } = await res.data;

        //setting if aadhar is valid -
        if (data?.status === "VALID") {
            toast("Valid Aadhar Number", { type: "success" });
        }
        formik.setFieldValue("dateOfBirth", data?.company["D.O.B"]);
    };

    const checkPan = () => {
        return panRegex.test(formik.values.pan);
    };

    const checkAadhar = () => {
        return aadharRegex.test(formik.values.aadhaar);
    };

    useEffect(() => {
        if (checkPan() && formik.values.firstName === "") {
            fetchPan();
        }
    }, [formik.values.pan]);

    useEffect(() => {
        if (checkAadhar()) {
            fetchAadhaar();
        }
    }, [formik.values.aadhaar]);

    return (
      
<form onSubmit={formik.handleSubmit} >
  <div className={InputStyles.formWrapper}>
    <h2 className={InputStyles.title}>Personal Information</h2>

    <div className={InputStyles.gridLayout}>
      {/* PAN */}
      <div className="flex flex-col">
        <label htmlFor="pan" className={InputStyles.label}>PAN Number</label>
        <input
          type="text"
          name="pan"
          id="pan"
          value={formik.values.pan}
          onChange={formik.handleChange}
          className={`${InputStyles.input} uppercase ${
            formik.touched.pan && formik.errors.pan ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.pan && formik.errors.pan && (
          <span className={InputStyles.error_msg}>{formik.errors.pan}</span>
        )}
      </div>

      {/* Aadhaar */}
      <div className="flex flex-col">
        <label htmlFor="aadhaar" className={InputStyles.label}>Aadhaar Number</label>
        <input
          type="text"
          name="aadhaar"
          id="aadhaar"
          value={formik.values.aadhaar}
          onChange={formik.handleChange}
          className={`${InputStyles.input} uppercase ${
            formik.touched.aadhaar && formik.errors.aadhaar ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.aadhaar && formik.errors.aadhaar && (
          <span className={InputStyles.error_msg}>{formik.errors.aadhaar}</span>
        )}
      </div>

      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className={InputStyles.label}>First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          className={`${InputStyles.input} ${
            formik.touched.firstName && formik.errors.firstName ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <span className={InputStyles.error_msg}>{formik.errors.firstName}</span>
        )}
      </div>

      {/* Middle Name */}
      <div className="flex flex-col">
        <label htmlFor="middleName" className={InputStyles.label}>Middle Name (Optional)</label>
        <input
          type="text"
          name="middleName"
          id="middleName"
          value={formik.values.middleName}
          onChange={formik.handleChange}
          className={`${InputStyles.input} ${
            formik.touched.middleName && formik.errors.middleName ? InputStyles.error_border : ""
          }`}
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className={InputStyles.label}>Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          className={`${InputStyles.input} ${
            formik.touched.lastName && formik.errors.lastName ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <span className={InputStyles.error_msg}>{formik.errors.lastName}</span>
        )}
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label htmlFor="gender" className={InputStyles.label}>Gender</label>
        <select
          name="gender"
          id="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className={`${InputStyles.selectInput} ${
            formik.touched.gender && formik.errors.gender ? InputStyles.error_border : ""
          }`}
        >
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.gender && formik.errors.gender && (
          <span className={InputStyles.error_msg}>{formik.errors.gender}</span>
        )}
      </div>

      {/* DOB */}
      <div className="flex flex-col">
        <label htmlFor="dateOfBirth" className={InputStyles.label}>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          className={`${InputStyles.input} ${
            formik.touched.dateOfBirth && formik.errors.dateOfBirth ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <span className={InputStyles.error_msg}>{formik.errors.dateOfBirth}</span>
        )}
      </div>

      {/* Father's Name */}
      <div className="flex flex-col">
        <label htmlFor="fatherName" className={InputStyles.label}>Father's Name</label>
        <input
          type="text"
          name="fatherName"
          id="fatherName"
          value={formik.values.fatherName}
          onChange={formik.handleChange}
          className={`${InputStyles.input} ${
            formik.touched.fatherName && formik.errors.fatherName ? InputStyles.error_border : ""
          }`}
        />
        {formik.touched.fatherName && formik.errors.fatherName && (
          <span className={InputStyles.error_msg}>{formik.errors.fatherName}</span>
        )}
      </div>
    </div>
    {/* Submit Button */}
    <div className="flex justify-center pt-4">
      <button type="submit" className={InputStyles.submitBtn}>
        Save
      </button>
    </div>
  </div>
</form>
    );
}
