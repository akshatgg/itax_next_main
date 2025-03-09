import React, { useRef, useState } from "react";

const FormComponent = ({
  onSubmit,
  validateInput,
  inputLabel,
  inputPlaceholder,
  buttonText,
  handleClear,
  inputmaxlength,
  showhide,
  generatePDF,
}) => {
  const inputRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim();

    if (!validateInput(inputValue)) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    await onSubmit(e, inputValue);
    setLoading(false);
  };

  const manageHandleClear = (e) => {
    inputRef.current.value = "";
    setError(false);
    handleClear(e);
  };

  const handleInputChange = (event) => {
    if (event.target.value) {
      event.target.value = event.target.value.toUpperCase();
    }
  };

    return (
        <form className="space-y-4 ">
            <div className="p-3">
                <label htmlFor="gstInput" className="text-gray-700 font-semibold ">
                    {inputLabel}:
                </label>
                <div className="flex flex-col ">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        ref={inputRef}
                        className="form-input w-full rounded-l outline-none border border-blue-500 px-5 py-2 mb-4"
                        id="gstInput"
                        placeholder={inputPlaceholder}
                        maxLength={inputmaxlength}
                    />
                </div>
                <div className="grid lg:px-4 gap-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className={`btn-primary ${loading?" cursor-not-allowed ":""}`}
                    >
                        {loading ? (<span className="spinner"></span>):("Search")}
                    </button>
                    <button
                        disabled={loading}
                        onClick={(e) => manageHandleClear(e)}
                        className={`btn-warning ${loading?" cursor-not-allowed ":""}`}
                    >
                        Clear
                    </button>
                    {showhide && (
                        <button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>Download</button>
                    )}
                </div>
            </div>
            {error && <p className="text-red-400">Please Enter Valid {inputLabel}</p>}
        </form>
    );
};

export default FormComponent;
