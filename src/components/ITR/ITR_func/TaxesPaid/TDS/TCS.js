import { StoreContext } from "@/store/store-context";
import { useContext } from "react";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TCS({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);

  const handleSubmit = (values) => {
    dispatch({
      type: actions.ITR,
      payload: {
        ...state.itr,
        taxesPaid: {
          ...state.itr.taxesPaid,
          tds: {
            ...state.itr.taxesPaid.tds,
            taxCollectedAtSource: {
              TANOfCollector: values.TANOfCollector,
              nameOfCollector: values.nameOfCollector,
              totalTaxCollected: values.totalTaxCollected,
              taxCollectedClaimedForThisYear:
                values.taxCollectedClaimedForThisYear,
              expenditureAgainstWhichTCSDeducted:
                values.expenditureAgainstWhichTCSDeducted,
              financialYearInWhichTCS: values.financialYearInWhichTCS,
            },
          },
        },
      },
    });
    setSection("");
  };

  const formik = useFormik({
    initialValues: {
      TANOfCollector: "",
      nameOfCollector: "",
      totalTaxCollected: "",
      taxCollectedClaimedForThisYear: "",
      expenditureAgainstWhichTCSDeducted: "",
      financialYearInWhichTCS: "",
    },
    validationSchema: Yup.object({
      TANOfCollector: Yup.string(),
      nameOfCollector: Yup.string(),
      totalTaxCollected: Yup.string(),
      taxCollectedClaimedForThisYear: Yup.string(),
      expenditureAgainstWhichTCSDeducted: Yup.string(),
      financialYearInWhichTCS: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="mx-auto max-w-4xl w-full px-4">
      <h3 className="border-b font-semibold mb-5">Tax Collected At Source</h3>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            TAN of Collector
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            name="firstName"
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Name of Collector
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            name="firstName"
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Total Tax Collected
          </label>
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Tax Collected claimed for this year
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Expenditure against which TCS was deducted
          </label>
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Financial Year in which TCS was collected
          </label>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.challanSerialNumber}
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          >
            <option selected="selected" value="2019">
              2019-2020
            </option>
            <option value="2018">2018-2019</option>
            <option value="2017">2017-2018</option>
            <option value="2016">2016-2017</option>
            <option value="2015">2015-2016</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          setSection("");
        }}
        className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
      >
        Save
      </button>
    </div>
  );
}
