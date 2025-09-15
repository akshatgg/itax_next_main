"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Project_Report = () => {
    const [property, setProperty] = useState("");
    const [promotercon, setPromotercon] = useState(false);
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const next = () => {
        setFormNo(formNo + 1);
    };
    const pre = () => {
        setFormNo(formNo - 1);
    };

    const [inputs, setInputs] = useState([
        {
            id: 1,
            lable: "Name",
            Nameinput: "",
            pricelable: "Price",
            Price: "",
            DepreciationRatelable: "Depreciation Rate",
            DepreciationRate: "",
        },
    ]);
    const handleAddInput = () => {
        setInputs([
            ...inputs,
            {
                id: inputs.length + 1,
                lable: "Name",
                Nameinput: "",
                pricelable: "Price",
                Price: "",
                DepreciationRatelable: "Depreciation Rate",
                DepreciationRate: "",
            },
        ]);
    };
    const handlePromotercon = () => {
        setPromotercon(!promotercon);
    };
    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setInputs(newInputs);
    };
    const generatePDF = () => {
        const formData = getValues(); // Get current form data

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        let yPosition = 30;

        // Add title
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('Project Report', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Business Information Section
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Business Information', margin, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');

        if (formData.businessName) {
            doc.text(`Business Name: ${formData.businessName}`, margin, yPosition);
            yPosition += 8;
        }

        if (formData.area) {
            doc.text(`Area of Property: ${formData.area}`, margin, yPosition);
            yPosition += 8;
        }

        if (formData.propertyType) {
            doc.text(`Property Type: ${formData.propertyType === 'rent' ? 'Rental' : 'Owned'}`, margin, yPosition);
            yPosition += 8;
        }

        // Property specific details
        if (formData.propertyType === 'rent') {
            if (formData.securityDeposit) {
                doc.text(`Security Deposit: ₹${formData.securityDeposit}`, margin, yPosition);
                yPosition += 8;
            }
            if (formData['monthly rent']) {
                doc.text(`Monthly Rent: ₹${formData['monthly rent']}`, margin, yPosition);
                yPosition += 8;
            }
        } else if (formData.propertyType === 'own') {
            if (formData.value) {
                doc.text(`Value of Land/Building: ₹${formData.value}`, margin, yPosition);
                yPosition += 8;
            }
            if (formData.depreciationRate) {
                doc.text(`Depreciation Rate: ${formData.depreciationRate}%`, margin, yPosition);
                yPosition += 8;
            }
        }

        yPosition += 10;

        // Plant and Machinery Section
        if (formData.plantAndMachinery && Object.keys(formData.plantAndMachinery).length > 0) {
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('Plant and Machinery', margin, yPosition);
            yPosition += 10;

            // Create table data for plant and machinery
            const plantData = [];
            Object.values(formData.plantAndMachinery).forEach((item, index) => {
                if (item.name || item.price || item.depreciationRate) {
                    plantData.push([
                        item.name || '',
                        item.price ? `₹${item.price}` : '',
                        item.depreciationRate ? `${item.depreciationRate}%` : ''
                    ]);
                }
            });

            if (plantData.length > 0) {
                doc.autoTable({
                    head: [['Name', 'Price', 'Depreciation Rate']],
                    body: plantData,
                    startY: yPosition,
                    margin: { left: margin, right: margin },
                    theme: 'grid'
                });
                yPosition = doc.lastAutoTable.finalY + 10;
            }
        }

        // Working Capital Section
        if (formData.workingCapital) {
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('Working Capital', margin, yPosition);
            yPosition += 10;

            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');

            if (formData.workingCapital.rawMaterial) {
                doc.text(`Raw Material: ₹${formData.workingCapital.rawMaterial}`, margin, yPosition);
                yPosition += 8;
            }
            if (formData.workingCapital.wages) {
                doc.text(`Wages: ₹${formData.workingCapital.wages}`, margin, yPosition);
                yPosition += 8;
            }
            if (formData.workingCapital.electricityCharges) {
                doc.text(`Electricity Charges: ₹${formData.workingCapital.electricityCharges}`, margin, yPosition);
                yPosition += 8;
            }
            if (formData.workingCapital.otherCharges) {
                doc.text(`Other Charges: ₹${formData.workingCapital.otherCharges}`, margin, yPosition);
                yPosition += 8;
            }
            yPosition += 10;
        }

        // Finance Section
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Finance', margin, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');

        if (formData.promoterContribution) {
            doc.text(`Promoter's Contribution: ₹${formData.promoterContribution}`, margin, yPosition);
            yPosition += 8;
        }

        if (formData.haveLoan && formData.loanAmount) {
            doc.text(`Loan Amount: ₹${formData.loanAmount}`, margin, yPosition);
            yPosition += 8;
            if (formData.loanInterest) {
                doc.text(`Interest Rate: ${formData.loanInterest}%`, margin, yPosition);
                yPosition += 8;
            }
        }

        if (formData.turnover) {
            doc.text(`Expected Sale Turnover per Year: ₹${formData.turnover}`, margin, yPosition);
            yPosition += 8;
        }

        // Save the PDF
        const fileName = `Project_Report_${formData.businessName || 'Business'}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);

        toast.success('PDF generated successfully!');
    };

    const submitHandler = (formData) => {
        console.log(formData);
    };
    return (
        <>
            <div className=" flex justify-center items-center">
                <div className="p-5 mx-5">
                    <div className="flex justify-center items-center mb-8">
                        {formArray.map((v, i) => (
                            <React.Fragment key={v}>
                                <div
                                    className={`w-[35px] my-3 text-white rounded-full ${
                                        formNo - 1 === i ||
                                        formNo - 1 === i + 1 ||
                                        formNo === formArray.length
                                            ? "bg-blue-500"
                                            : "bg-slate-400"
                                    } h-[35px] flex justify-center items-center`}
                                >
                                    {v}
                                </div>
                                {i !== formArray.length - 1 && (
                                    <div
                                        className={`w-[85px] h-[2px] ${
                                            formNo === i + 2 ||
                                            formNo === formArray.length
                                                ? "bg-blue-500"
                                                : "bg-slate-400"
                                        }`}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {formNo === 1 && (
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col mb-2">
                                    <label
                                        htmlFor="batch"
                                        className="capitalize"
                                    >
                                        Business Name
                                        <sup className="text-red-500 text-lg">
                                            *
                                        </sup>
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    <select
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        name="businessName"
                                        {...register("businessName", {
                                            required: true,
                                        })}
                                    >
                                        <option value="" disabled="">
                                            -- Select an Option --
                                        </option>
                                        <option value="Flour Mill">
                                            Flour Mill
                                        </option>
                                        <option value="Toilet Soap Manufacturing Unit">
                                            Toilet Soap Manufacturing Unit
                                        </option>
                                        <option value="Tomato sauce Manufacturing Unit">
                                            Tomato sauce Manufacturing Unit
                                        </option>
                                        <option value="Roasted Rice Flakes">
                                            Roasted Rice Flakes
                                        </option>
                                        <option value="Banana Fiber Extraction and weaving">
                                            Banana Fiber Extraction and weaving
                                        </option>
                                        <option value="Computer Assembling">
                                            Computer Assembling
                                        </option>
                                        <option value="Light Engineering(Nuts, Bolts, Washers, Rivets etc.)">
                                            Light Engineering(Nuts, Bolts,
                                            Washers, Rivets etc.)
                                        </option>
                                        <option value="Metal Based Industries: Agricultural Implements, Cutleries&amp; Hand Tools">
                                            Metal Based Industries: Agricultural
                                            Implements, Cutleries&amp; Hand
                                            Tools
                                        </option>
                                        <option value="Manufacturing of Paper Products (Paper Cups)">
                                            Manufacturing of Paper Products
                                            (Paper Cups)
                                        </option>
                                        <option value="Curry and Rice Powder">
                                            Curry and Rice Powder
                                        </option>
                                        <option value="Bakery Products">
                                            Bakery Products
                                        </option>
                                        <option value="Steel Furniture">
                                            Steel Furniture
                                        </option>
                                        <option value="Desiccated Coconut Powder">
                                            Desiccated Coconut Powder
                                        </option>
                                        <option value="Foot Wear">
                                            Foot Wear
                                        </option>
                                        <option value="Wooden Furniture Manufacturing Unit">
                                            Wooden Furniture Manufacturing Unit
                                        </option>
                                        <option value="Manufacturing of Paper Napkins">
                                            Manufacturing of Paper Napkins
                                        </option>
                                        <option value="Pappad Manufacturing">
                                            Pappad Manufacturing
                                        </option>
                                        <option value="Readymade Garments">
                                            Readymade Garments
                                        </option>
                                        <option value="Pickle Unit">
                                            Pickle Unit
                                        </option>
                                        <option value="Manufacturing of Palm Plate">
                                            Manufacturing of Palm Plate
                                        </option>
                                        <option value="Note Book Manufacturing">
                                            Note Book Manufacturing
                                        </option>
                                    </select>
                                    {errors.businessName && (
                                        <span className="text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="area">
                                        Area of property:
                                    </label>
                                </div>
                                <div className="flex flex-col mb-2 col-span-2">
                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="area"
                                        id="area"
                                        {...register("area", {
                                            required: true,
                                        })}
                                    />
                                    {errors.area && (
                                        <span>This field is required</span>
                                    )}
                                </div>
                                <br />

                                <div className="col-span-2">
                                    <div className="flex items-center mb-4 ">
                                        <input
                                            id="default-radio-1"
                                            type="radio"
                                            value="rent"
                                            name="propertyType"
                                            onClick={(e) =>
                                                setProperty(e.target.value)
                                            }
                                            {...register("propertyType", {
                                                required: true,
                                            })}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="default-radio-1"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Rental
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="default-radio-2"
                                            type="radio"
                                            name="propertyType"
                                            onClick={(e) =>
                                                setProperty(e.target.value)
                                            }
                                            {...register("propertyType", {
                                                required: true,
                                            })}
                                            value="own"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="default-radio-2"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Owned
                                        </label>
                                    </div>
                                    {errors.propertyType && (
                                        <span className="text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                                {property === "rent" && (
                                    <>
                                        <div>
                                            <label htmlFor="securityDeposit">
                                                Value of Security Deposit:
                                            </label>
                                        </div>
                                        <div className="flex flex-col col-span-2 mb-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="securityDeposit"
                                                placeholder="Value of Security Deposit"
                                                id="securityDeposit"
                                                {...register(
                                                    "securityDeposit",
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="monthlyRent">
                                                Monthly Rent:
                                            </label>
                                        </div>
                                        <div className="flex flex-col col-span-2 mb-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="monthly rent"
                                                placeholder="Monthly Rent"
                                                id="monthly rent"
                                                {...register("monthly rent", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </>
                                )}
                                {property === "own" && (
                                    <>
                                        <div>
                                            <label htmlFor="value">
                                                Value of Land/building:
                                            </label>
                                        </div>
                                        <div className="flex flex-col col-span-2 mb-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="value"
                                                placeholder="Value in ₹"
                                                id="value"
                                                {...register("value", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="depreciationRate">
                                                Depreciation Rate of Building
                                            </label>
                                        </div>
                                        <div className="flex flex-col col-span-2 mb-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="depreciationRate"
                                                placeholder="Depreciation Rate of Building in %"
                                                id="depreciationRate"
                                                {...register(
                                                    "depreciationRate",
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="mt-4 flex justify-center items-center">
                                    <button
                                        disabled={
                                            errors.businessName ||
                                            errors.area ||
                                            errors.propertyType
                                        }
                                        onClick={next}
                                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {formNo === 2 && (
                            <div className="grid grid-cols-4 gap-2">
                                <div className="flex flex-col mb-2 col-span-4 text-center">
                                    <label className="font-bold text-lg">
                                        Plant and Machinery
                                    </label>
                                </div>

                                {inputs.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <div
                                            className="flex flex-col"
                                            key={item.lable}
                                        >
                                            <p>{item.lable}</p>
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                name="Nameinput"
                                                type="text"
                                                onChange={(event) =>
                                                    handleChange(event, index)
                                                }
                                                {...register(
                                                    `plantAndMachinery.${item.id}.name`,
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>
                                        <div
                                            className="flex flex-col"
                                            key={item.lable}
                                        >
                                            <p>{item.pricelable}</p>
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                name="Price"
                                                type="text"
                                                onChange={(event) =>
                                                    handleChange(event, index)
                                                }
                                                {...register(
                                                    `plantAndMachinery.${item.id}.price`,
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>
                                        <div
                                            className="flex flex-col"
                                            key={index}
                                        >
                                            <p>{item.DepreciationRatelable}</p>
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                name="DepreciationRate"
                                                type="text"
                                                onChange={(event) =>
                                                    handleChange(event, index)
                                                }
                                                {...register(
                                                    `plantAndMachinery.${item.id}.depreciationRate`,
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>
                                        <div>
                                            {inputs.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-white bg-red-600 hover:bg-primary/90 focus:ring-4 py-1 px-3 m-2 mt-9 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm  text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                                                    onClick={() =>
                                                        handleDeleteInput(index)
                                                    }
                                                >
                                                    <Icon
                                                        className="w-6 h-6 me-2 -mx-3"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        data-prefix="fab"
                                                        data-icon="apple"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 384 512"
                                                        icon="gg:add"
                                                    />
                                                    Delete
                                                </button>
                                            )}
                                            {index === inputs.length - 1 && (
                                                <button
                                                    type="button"
                                                    className="text-white bg-primary hover:bg-primary/90 focus:ring-4 py-1 px-3 m-2 mt-9 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm  text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                                                    onClick={() =>
                                                        handleAddInput()
                                                    }
                                                >
                                                    <Icon
                                                        className="w-6 h-6 me-2 -mx-3"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        data-prefix="fab"
                                                        data-icon="apple"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 384 512"
                                                        icon="gg:add"
                                                    />
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}

                                <div className="flex flex-col mb-2 col-span-4 text-center mt-5">
                                    <label className="font-bold text-lg">
                                        Working Capital
                                    </label>
                                </div>

                                <div className="flex flex-col mb-2 ">
                                    <label htmlFor="arera">Raw Material</label>
                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(
                                            `workingCapital.rawMaterial`,
                                            {
                                                required: true,
                                            },
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col mb-2 ">
                                    <label htmlFor="arera">Wages</label>
                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(`workingCapital.wages`, {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <div className="flex flex-col mb-2 ">
                                    <label htmlFor="arera">
                                        Electricity Charges
                                    </label>

                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(
                                            `workingCapital.electricityCharges`,
                                            {
                                                required: true,
                                            },
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col mb-2 ">
                                    <label htmlFor="arera">Other Charges</label>

                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(
                                            `workingCapital.otherCharges`,
                                            {
                                                required: true,
                                            },
                                        )}
                                    />
                                </div>

                                <div className="mt-4 flex justify-center items-center">
                                    <button
                                        onClick={next}
                                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {formNo === 3 && (
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col mb-2 col-span-3 text-center">
                                    <label className="font-bold text-lg">
                                        Finance
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="">
                                        Promoter&apos;s Contribution
                                    </label>
                                </div>
                                <div className="flex flex-col mb-2  col-span-2">
                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(`promoterContribution`, {
                                            required: true,
                                        })}
                                    />
                                    {errors.promoterContribution && (
                                        <span className="text-red-500 text-sm">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center mb-4 col-span-3 justify-end ">
                                    {/* <input
                                        id="haveLoan"
                                        type="checkbox"
                                        value="yes"
                                        name="haveLoan"
                                        onClick={(e) =>
                                            setPromotercon(e.target.value)
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        {...register(`haveLoan`)}
                                    />
                                    <label
                                        htmlFor="haveLoan"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Do You Have Any Loan
                                    </label> */}

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            onChange={handlePromotercon}
                                            type="checkbox"
                                            className="sr-only peer"
                                            {...register("haveLoan", {
                                                required: false,
                                            })}
                                            onClick={handlePromotercon}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium ">
                                            Do You Have Any Loan
                                        </span>
                                    </label>
                                </div>
                                {promotercon === true && (
                                    <>
                                        <div>
                                            <label htmlFor="">
                                                Amount Of Loan
                                            </label>
                                        </div>
                                        <div className="flex flex-col mb-2  col-span-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="gstin_no"
                                                id="gstin_no"
                                                {...register(`loanAmount`, {
                                                    required: true,
                                                })}
                                            />
                                            {errors.loanAmount && (
                                                <span className="text-red-500 text-sm">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="">
                                                Interest rate on Loan
                                            </label>
                                        </div>
                                        <div className="flex flex-col mb-2  col-span-2">
                                            <input
                                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                                type="text"
                                                name="gstin_no"
                                                id="gstin_no"
                                                {...register(`loanInterest`, {
                                                    required: true,
                                                })}
                                            />
                                            {errors.loanInterest && (
                                                <span className="text-red-500 text-sm">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="flex flex-col mb-2 col-span-3 text-center">
                                    <label className="font-bold text-lg">
                                        Turnover per Year
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="">
                                        Expected Sale Turnover per Year
                                    </label>
                                </div>
                                <div className="flex flex-col mb-2  col-span-2">
                                    <input
                                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                                        type="text"
                                        name="gstin_no"
                                        id="gstin_no"
                                        {...register(`turnover`, {
                                            required: true,
                                        })}
                                    />
                                    {errors.turnover && (
                                        <span className="text-red-500 text-sm">
                                            This field is required
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 flex gap-2 justify-center items-center col-span-3">
                                    <button
                                        type="button"
                                        onClick={generatePDF}
                                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                                    >
                                        Generate PDF
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Project_Report;
