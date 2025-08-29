'use client';
import React, { useState } from 'react';
import CustomButton from '../GSTRHomeComponent/CustomButton';
import GSTRLoginWithoutOtp from './GSTRLoginWithoutOtp';
import BackButton from '../../BackButton';

function MyComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <BackButton />
      <main className="flex flex-col gap-6 p-6 mx-auto mt-4 bg-white shadow-md border border-stone-300 rounded-lg w-full max-w-6xl">
        {/* GSTIN + Legal Name */}
        <section className="grid gap-4 sm:grid-cols-2 text-sm text-black">
          <Field label="GSTIN (Registration)" value="23DNNPS19100QZG" />
          <Field label="Legal Name (As per PAN)" value="AJAY SHARMA" />
        </section>

        <CashLedgerSection />
        <BalanceTable />
        <TransferSection />

      </main>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-40 font-medium">{label} :</label>
      <input
        type="text"
        className="flex-grow px-3 py-2 border border-gray-400 rounded-md bg-gray-100"
        value={value}
        readOnly
      />
    </div>
  );
}

function CashLedgerSection() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-center text-gray-700">
        Cash Ledger Balance – Available for Transfer
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <CustomButton className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          Get Cash Ledger Balance From GSTN
        </CustomButton>
        <CustomButton
          className="px-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
          onClick={() => setOpenModal('gstn')}
        >
          Upload on GSTN
        </CustomButton>
      </div>
      {openModal === 'gstn' && <GSTRLoginWithoutOtp onClose={() => setOpenModal(null)} />}
    </section>
  );
}

function BalanceTable() {
  const headers = ['Integrated Tax', 'Central Tax', 'State/UI Tax', 'Cess', 'Total'];
  const rows = ['Tax', 'Interest', 'Fee', 'Penalty', 'Others', 'Total'];

  return (
    <section>
      <h3 className="text-base font-semibold text-gray-700 mb-3">Cash Ledger Balance</h3>
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Description</th>
              {headers.map((h, i) => (
                <th key={i} className="p-2 border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border font-medium">{row}</td>
                {headers.map((_, colIdx) => (
                  <td key={colIdx} className="p-2 border">0</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TransferSection() {
  const headers = ['Major Head', 'Minor Head', 'Major Head', 'Tax', 'Interest', 'Fee', 'Penalty', 'Others'];

  return (
    <section>
      <h3 className="text-base font-semibold text-gray-700 mb-3">Add Record</h3>
      <div className="border border-violet-300 rounded-lg overflow-hidden">
        <div className="flex justify-between font-semibold bg-gray-200 p-3">
          <div>Transfer Amount From</div>
          <div>Transfer Amount To</div>
        </div>
        <div className="grid grid-cols-8 text-center bg-gray-100 font-medium p-2">
          {headers.map((h, i) => (
            <div key={i} className="border p-2">{h}</div>
          ))}
        </div>
        <div className="h-12 flex items-center justify-center text-gray-400 italic">
          + Add transfer rows here
        </div>
      </div>
    </section>
  );
}

export default MyComponent;
