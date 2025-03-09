import { useContext, useState } from 'react';
import { StoreContext } from '../../../store/store-context';
import { ITR } from '../../../store/actions';
import { useNavigate } from 'react-router-dom';

export default function InvestmentDetails() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext);
    const [form, setForm] = useState(state.itr.deductions.investmentDetails);

    const handleSumit = () => {
        return dispatch({
            type: ITR,
            payload: {
                ...state.itr,
                deductions: {
                    ...state.itr.deductions,
                    investmentDetails: form,
                },
            },
        });
    };

    return (
        <div className="mx-auto max-w-4xl w-full">
            <h3 className="border-b font-semibold mb-5">
                Investment made During Extended Period
            </h3>
            <div className="grid grid-cols-3 gap-5">
                <p></p>
                <p className="text-center">
                    Eligible Amount of Total Investments/Payments made towards
                    claiming Deductions
                </p>
                <p className="text-center flex flex-col">
                    Amount Invest/Paid Between 1 Apr 2020 - 31 Jul 2020 (Of the
                    Total Eligible Amount)
                </p>
                <label
                    htmlFor="taxSavingInvestments80C_eligibleAmountOfTotalInvestmentsPaymentsMadeTowardsClaimingDeductions"
                    className="text-sm font-medium flex items-center"
                >
                    80C: Tax Saving Investments
                </label>
                <input
                    type="text"
                    name="taxSavingInvestments80C_eligibleAmountOfTotalInvestmentsPaymentsMadeTowardsClaimingDeductions"
                    id="taxSavingInvestments80C_eligibleAmountOfTotalInvestmentsPaymentsMadeTowardsClaimingDeductions"
                    value={
                        form.investmentMadeDuringExtendedPeriod
                            .taxSavingInvestments80C_eligibleAmountOfTotalInvestmentsPaymentsMadeTowardsClaimingDeductions
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            investmentMadeDuringExtendedPeriod: {
                                ...form.investmentMadeDuringExtendedPeriod,
                                taxSavingInvestments80C_eligibleAmountOfTotalInvestmentsPaymentsMadeTowardsClaimingDeductions:
                                    e.target.value,
                            },
                        })
                    }
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
                <input
                    type="text"
                    name="taxSavingInvestments80C_amountInvestPaidBetween1Apr202031Jul2020OfTheTotalEligibleAmount"
                    id="taxSavingInvestments80C_amountInvestPaidBetween1Apr202031Jul2020OfTheTotalEligibleAmount"
                    value={
                        form.investmentMadeDuringExtendedPeriod
                            .taxSavingInvestments80C_amountInvestPaidBetween1Apr202031Jul2020OfTheTotalEligibleAmount
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            investmentMadeDuringExtendedPeriod: {
                                ...form.investmentMadeDuringExtendedPeriod,
                                taxSavingInvestments80C_amountInvestPaidBetween1Apr202031Jul2020OfTheTotalEligibleAmount:
                                    e.target.value,
                            },
                        })
                    }
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
            </div>
            <button
                onClick={() => {
                    handleSumit();
                    navigate('/itr-filling/taxes-filling');
                }}
                className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
            >
                Save
            </button>
        </div>
    );
}
