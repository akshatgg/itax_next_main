"use client";
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '@/store/store-context';
import Actions from '@/store/actions';
import { useRouter } from 'next/navigation';
import { InputStyles } from '@/app/styles/InputStyles';

export default function Address() {
    const router = useRouter();
    const [state, dispatch] = useContext(StoreContext);
    const [form, setForm] = useState(state.itr.personalInfo.address);
    const isFormType_16 = state.itr_type.form16_type;

    const handleSumit = () => {
        return dispatch({
            type: Actions.ITR,
            payload: {
                ...state.itr,
                personalInfo: {
                    ...state.itr.personalInfo,
                    address: form,
                },
            },
        });
    };

    useEffect(() => {
        const handleWheel = (event) => {
            if (document.activeElement.type === 'number') {
                document.activeElement.blur();
            }
        };

        document.addEventListener('wheel', handleWheel);

        return () => document.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div className="mx-auto max-w-4xl w-full">
            <div className="md:grid md:grid-cols-2 flex flex-col px-4 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="flat" className={InputStyles.label}>
                        Flat/Door/Block Number
                    </label>
                    <input
                        type="text"
                        name="flat"
                        id="flat"
                        value={form.flat}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                flat: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="premiseName"
                        className={InputStyles.label}
                    >
                        Premise Name
                    </label>
                    <input
                        type="text"
                        name="premiseName"
                        id="premiseName"
                        value={form.premiseName}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                premiseName: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="road" className={InputStyles.label}>
                        Road / Street
                    </label>
                    <input
                        type="text"
                        name="road"
                        id="road"
                        value={form.road}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                road: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pincode" className={InputStyles.label}>
                        Pincode
                    </label>
                    <input
                        type="number"
                        name="pincode"
                        id="pincode"
                        value={form.pincode}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                pincode: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="area" className={InputStyles.label}>
                        Area / Locality
                    </label>
                    <input
                        type="text"
                        name="area"
                        id="area"
                        value={form.area}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                area: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="city" className={InputStyles.label}>
                        Town / City
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={form.city}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                city: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="state" className={InputStyles.label}>
                        State
                    </label>
                    <select
                        name="state"
                        id="state"
                        value={form.state}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                state: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    >
                        <option value="">--Select--</option>
                        {stateList.map((item) => (
                            <option key={item} value={item.toLowerCase()}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="country" className={InputStyles.label}>
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={form.country}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                country: e.target.value,
                            })
                        }
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mobile" className={InputStyles.label}>
                        Mobile
                    </label>
                    <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        value={form.mobile}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                mobile: e.target.value,
                            })
                        }
                        placeholder="Mobile number"
                        className={InputStyles.input}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className={InputStyles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                        placeholder="Email"
                        className={InputStyles.input}
                    />
                </div>

            </div>
                <div className="flex mt-10 ">
                    <button className=" shadow-sm transition-colors bg-primary hover:bg-blue-950 px-16 py-3 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2 mx-auto"
                        onClick={() => {
                            handleSumit();
                            router.push(`${isFormType_16 ? "/dashboard/itr/itr-filling/form-16":"/dashboard/itr/itr-filling/income-sources"}`);
                        }}
                    > Save
                    </button>
                </div>
        </div>
    );
}

const stateList = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Pondicherry',
];
