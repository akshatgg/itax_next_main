export default function MoreInfo() {
  return (
    <div className="mx-auto flex flex-col items-start px-8 max-w-4xl w-full">
      <h3 className="border-b font-semibold mb-5">
        [Optional] Advanced Info, required only in a few cases
      </h3>
      <p>These sections are not required in most cases.</p>
      <p>
        If any of these details are applicable for you, enter the details below.
        Else click &quot;Go to Next&quot;
      </p>
      <p className="mt-5">
        Are any of these following applicable to you? If not, you can just skip
        this section.
      </p>
      <ul className="list-disc list-inside">
        <li>You are a NRI or have spent time outside India.</li>
        <li>
          You own shares of an Unlisted company (shares that are not listed on
          any stock exchange).
        </li>
        <li>You are a Director of any company in India.</li>
        <li>
          You are a resident and have Foreign Assets or Income or you have paid
          taxes outside India.
        </li>
        <li>You have total income more than ₹50 Lakhs.</li>
        <li>
          You have deposited more than ₹1 crore in one or more current accounts,
          during the previous year.
        </li>
        <li>
          You have incurred expenditure of more than ₹1 Lakh on electricity
          consumption or more than ₹2 lakhs on foreign country travel, during
          the previous year.
        </li>
      </ul>
    </div>
  );
}
