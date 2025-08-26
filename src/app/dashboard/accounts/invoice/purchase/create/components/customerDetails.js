'use client';
import regex from '@/utils/regex';
import gstStateCodes from '@/utils/gstStateCodes';
import { useState } from 'react';
function isUnionTerritoryState(stateString) {
  const unionTerritoryNames = [
    'DADRA AND NAGAR HAVELI AND DAMAN AND DIU (NEWLY MERGED UT)',
    'ANDHRA PRADESH(BEFORE DIVISION)',
    'ANDHRA PRADESH (NEWLY ADDED)',
    'LADAKH (NEWLY ADDED)',
    'OTHER TERRITORY',
    'CENTRE JURISDICTION',
  ];

  return unionTerritoryNames.some((utName) => utName === stateString);
}
export default function CustomerDetails(props) {
  const {
    register,
    setError,
    clearErrors,
    errors,
    setValue,
    parties,
    getValues,
    setParty_State,
  } = props;
  const [currentUserGstinState, setCurrentUserGstinState] = useState({});
  const onSelectParty = (e) => {
    try {
      const party = parties.find((party) => party.id === e.target.value);
      setCurrentUserGstinState(
        gstStateCodes.find(
          (state) => state.code === party?.gstin?.substring(0, 2),
        ),
      );
      setValue('phone', party?.phone || '');
      setValue('partyAddress', party?.address || '');
      setValue('partyGstin', party?.gstin || '');
    } catch (error) {
      console.error('Error setting party details:', error);
    }
  };
  const onSelectStateOfSupply = (e) => {
    setParty_State({
      isSameState: e.target.value === currentUserGstinState?.state,
      isOtherState: e.target.value === 'OTHER TERRITORY',
      isUnionTerritory: isUnionTerritoryState(e.target.value),
    });
    // setValue("gstinStateCode", currentUserGstinState?.code || "")
  };
  return (
    <div className="p-2 rounded-md border shadow-sm shadow-blue-600">
      <div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
        party details
      </div>
      <ul className="mt-2 grid gap-2 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <li>
          <label className="label" htmlFor="id">
            Party Name
          </label>
          <select
            className="input"
            {...register('id', {
              required: 'party is required',
              onChange: onSelectParty,
            })}
            // defaultValue={""}
          >
            <option value="">select party...</option>
            {parties?.map((party, index) => (
              <option key={index} value={party.id}>
                {party.partyName}
              </option>
            ))}
          </select>
          <p className=" text-xs text-red-500 h-2 px-2">
            {parties.length === 0 && 'No party found'}
            {errors.id && errors.id.message}
          </p>
        </li>
        <li>
          <label className="label" htmlFor="stateOfSupply">
            State Of Supply
          </label>
          <select
            className="input"
            id="stateOfSupply"
            {...register('stateOfSupply', {
              required: 'Item name is required',
              onChange: onSelectStateOfSupply,
            })}
            defaultValue={currentUserGstinState?.state ? 'Same State' : ''}
          >
            <option
              value={currentUserGstinState?.state ? 'Same State' : ''}
              className="text-md"
            >
              {currentUserGstinState?.state ? 'Same State' : 'SelectState'}
            </option>
            {gstStateCodes.map((state, index) => (
              <option className="text-sm" key={index} value={state.state}>
                {state.code}:{state.state}
              </option>
            ))}
          </select>
          <p className=" text-sm text-red-500 h-4 px-2">
            {errors.stateOfSupply && errors.stateOfSupply.message}
          </p>
          <div className="text-sm mb-2">
            {"Party's"} State: {currentUserGstinState?.code}-
            {currentUserGstinState?.state || 'Select State...'}
          </div>
        </li>
        <li>
          <label className="label" htmlFor="partyAddress">
            Party Address
          </label>
          <input
            className="input"
            type="text"
            id="partyAddress"
            {...register('partyAddress')}
            placeholder="123 Main Street"
          />
          <p className=" text-xs text-red-500 h-2 px-2">
            {errors.partyAddress && errors.partyAddress.message}
          </p>
        </li>
        <li>
          <label className="label" htmlFor="partyGstin">
            GSTIN
          </label>
          <input
            className="input"
            type="text"
            id="partyGstin"
            maxLength="15"
            {...register('partyGstin', {
              onChange: (e) => {
                let value = e.target.value;
                value = value.toUpperCase();
                const r = regex.GSTIN;
                if (!r.test(value)) {
                  setError('partyGstin', {
                    type: 'manual',
                    message: 'Invalid Gstin',
                  });
                } else {
                  clearErrors('partyGstin');
                }
                e.target.value = value;
              },
            })}
            placeholder="partyGstin"
          />
          <p className=" text-xs text-red-500 h-2 px-2">
            {errors.partyGstin && errors.partyGstin.message}
          </p>
        </li>
      </ul>
    </div>
  );
}
