import { useRouter } from "next/navigation";

export default function CapitalGain({ setSection }) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-4xl w-full px-4">
      <h3 className="border-b font-semibold mb-5">Shares/Debentures</h3>
      <ShareComp
        data={[
          "Listed Securities",
          "Non Listed Securities",
          "Listed Debentures",
          "Non Listed Debentures",
        ]}
        typeOfShare={true}
      />
      <h3 className="border-b font-semibold mb-5 mt-8">Mutual Funds</h3>
      <ShareComp
        data={["Mutual Fund (Equity)", "Mutual Fund (Other than equity)"]}
        typeOfShare={true}
      />
      <h3 className="border-b font-semibold mb-5 mt-8">Stock Options/RSUs</h3>
      <ShareComp
        data={[
          "Indian Listed Shares",
          "Indian Non-Listed Shares",
          "Foreign Listed Shares",
          "Foreign Non-Listed Shares",
        ]}
        typeOfShare={true}
      />
      <h3 className="border-b font-semibold mb-5 mt-8">
        Land or Building(Property)
      </h3>
      <ShareComp typeOfShare={false} />
      <h3 className="border-b font-semibold mb-5 mt-8">Any other Assets</h3>
      <ShareComp typeOfShare={false} />
      <h3 className="border-b font-semibold mb-5 mt-8">Deemed Capital Gains</h3>
      <div className="grid grid-cols-1 gap-5">
        <div className="">
          <input type="checkbox" name="shortTerm" id="shortTerm" />
          <label htmlFor="shortTerm" className="text-sm font-medium ml-2">
            Short Term Capital Gain
          </label>
          <ShortLongTermComp short={true} />
        </div>
        <div className="">
          <input type="checkbox" name="longTerm" id="longTerm" />
          <label htmlFor="longTerm" className="text-sm font-medium ml-2">
            Long Term Capital Gain
          </label>
          <ShortLongTermComp />
        </div>
      </div>
      <button
        onClick={() => router.push("/dashboard/itr/itr-filling/deductions")}
        className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
      >
        Save
      </button>
    </div>
  );
}

const ShareComp = ({ data, typeOfShare }) => {
  return (
    <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
      {typeOfShare && (
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Type of Share
          </label>
          <select
            name=""
            id=""
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          >
            {data.map((items) => (
              <option key={items} value={items.toLowerCase()}>
                {items}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm font-medium">
          Date of Sale
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm font-medium">
          Date of Purchase
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
        />
      </div>
    </div>
  );
};

const ShortLongTermComp = ({ short }) => {
  return (
    <div>
      <p className="text-sm my-2">
        Whether any amount of unutilized capital gain on asset transferred
        during the previous years shown below was deposited in the Capital Gains
        Accounts Scheme within due date for that year?
      </p>
      <div className="flex text-sm">
        <input
          type="radio"
          name="capitalGain"
          id="capitalGainYes"
          className="mr-2"
        />
        <label htmlFor="capitalGainYes" className="mr-10 font-medium">
          Yes
        </label>
        <input
          type="radio"
          name="capitalGain"
          id="capitalGainNo"
          className="mr-2"
        />
        <label htmlFor="capitalGainNo" className="mr-10 font-medium">
          No
        </label>
        <input
          type="radio"
          name="capitalGain"
          id="capitalGainNotApplicable"
          className="mr-2"
        />
        <label htmlFor="capitalGainNotApplicable" className="mr-10 font-medium">
          Not Applicable
        </label>
      </div>
      <table className="text-sm text-left my-5">
        <tr className="flex md:table-row flex-col">
          <th className="border">ID</th>
          <th className="border">Prev year in which asset transferred</th>
          <th className="border">
            Section under which deduction claimed in that year
          </th>
          <th className="border">
            Year in which new asset acquired/constructed
          </th>
          <th className="border">
            Amount utilised out of capital Gains Account
          </th>
          <th className="border">Amount not used for new asset</th>
          <th className="border"></th>
        </tr>
        <tr className="flex md:table-row flex-col">
          <td className="border">1</td>
          <td className="border">
            <select name="" id="">
              <option value="">2022-23</option>
            </select>
          </td>
          <td className="border">
            <select name="" id="">
              <option value="ExemptionUS54">54</option>
              <option value="ExemptionUS54B">54B</option>
              <option value="ExemptionUS54F">54F</option>
              <option value="ExemptionUS54D">54D</option>
              <option value="ExemptionUS54G">54G</option>
              <option value="ExemptionUS54GA">54GA</option>
              <option value="ExemptionUS54GB">54GB</option>
            </select>
          </td>
          <td className="border">
            <select name="" id="">
              <option value="">2022-23</option>
            </select>
          </td>
          <td className="border">200</td>
          <td className="border">200</td>
          <td className="border">Remove</td>
        </tr>
      </table>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Any other amount deemed to be {short ? "short " : "long "} term
            capital gains
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            Total amount deemed to be {short ? "short " : "long "}
            term capital gains
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
          />
        </div>
      </div>
    </div>
  );
};  