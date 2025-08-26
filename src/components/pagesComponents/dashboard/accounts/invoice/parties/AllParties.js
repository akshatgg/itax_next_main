'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import userAxios from '@/lib/userbackAxios';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';

// Define which columns to display by default
const defaultVisibleColumns = [
  'partyName',
  'email',
  'phone',
  'gstin',
  'address',
];

export default function AllParties(props) {
  const { type = 'customer' } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const [allParties, setAllParties] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('5'); // Default to last 30 days
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // All available columns
  const allColumns = [
    'partyName',
    'bankAccountNumber',
    'bankBranch',
    'bankIfsc',
    'bankName',
    'createdAt',
    'email',
    'gstin',
    'id',
    'pan',
    'address',
    'phone',
    'tan',
    'updatedAt',
    'upi',
    'userId',
  ];

  const fetchPartiesData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      // Fetch parties based on the type prop
      const response = await userAxios.get('/invoice/parties', {
        params: { types: type },
      });
      setAllParties(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError({ isError: true, error });
    }
  };

  useEffect(() => {
    try {
      fetchPartiesData();
    } catch (error) {
      toast.error('Failed to load parties data');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleDeleteParty = async (id) => {
    try {
      setIsLoading(true);
      const resp = await userAxios.delete(`/invoice/parties/${id}`);

      if (resp.data.success) {
        fetchPartiesData();
        toast.success(
          `${type === 'customer' ? 'Customer' : 'Supplier'} Deleted Successfully`,
        );
        setDeleteConfirm(null);
      } else {
        toast.error(
          `Something went wrong. ${type === 'customer' ? 'Customer' : 'Supplier'} Not Deleted`,
        );
      }
    } catch (error) {
      toast.error(
        `Failed to delete ${type === 'customer' ? 'customer' : 'supplier'}.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleColumnVisibility = (column) => {
    if (visibleColumns.includes(column)) {
      // Don't allow removing the last column
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((col) => col !== column));
      }
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const resetColumns = () => {
    setVisibleColumns(defaultVisibleColumns);
  };

  const showAllColumns = () => {
    setVisibleColumns(allColumns);
  };

  // Filter parties based on search term and only show the selected type
  const filteredParties = allParties?.parties?.filter((party) => {
    // Only include parties of the selected type
    if (party.type !== type) return false;

    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      (party.partyName &&
        party.partyName.toLowerCase().includes(searchLower)) ||
      (party.address && party.address.toLowerCase().includes(searchLower)) ||
      (party.email && party.email.toLowerCase().includes(searchLower)) ||
      (party.phone && party.phone.toLowerCase().includes(searchLower)) ||
      (party.gstin && party.gstin.toLowerCase().includes(searchLower))
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const linkToCreateParty = '/dashboard/accounts/invoice/parties/add-party';
  const typeLabel = type === 'customer' ? 'Customer' : 'Supplier';
  const typeLabelPlural = type === 'customer' ? 'Customers' : 'Suppliers';

  return (
    <>
      <section className="p-4 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Icon
                  icon="solar:users-group-rounded-bold"
                  className="text-sky-500"
                />
                {typeLabelPlural} Parties
              </h1>
              <Link href={`${linkToCreateParty}?type=${type}`}>
                {/* <button
                  type="button"
                  className="flex items-center gap-2 text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                >
                  <Icon icon="solar:add-circle-bold" className="text-lg" />
                  Add {typeLabel}
                </button> */}
                <Button
                  size={'sm'}
                  className={'m-2 flex items-center gap-2 text-white'}
                >
                  <Icon icon="solar:add-circle-bold" className="text-lg" />
                  Add {typeLabel}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Icon
                    icon="heroicons:magnifying-glass"
                    className="text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  type="search"
                  className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder={`Search ${typeLabelPlural.toLowerCase()} by name, email, phone...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="h-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-7 text-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="1">Last week</option>
                    <option value="2">Last month</option>
                    <option value="3">Yesterday</option>
                    <option value="4">Last 7 days</option>
                    <option value="5">Last 30 days</option>
                  </select>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowColumnSelector(!showColumnSelector)}
                    className="flex items-center gap-1 h-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 text-sm hover:bg-gray-100 focus:ring-2 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    <Icon
                      icon="heroicons:adjustments-horizontal"
                      className="text-lg"
                    />
                    Columns
                  </button>

                  {showColumnSelector && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Toggle Columns
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={resetColumns}
                            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            Reset
                          </button>
                          <span className="text-gray-400">|</span>
                          <button
                            onClick={showAllColumns}
                            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            Show All
                          </button>
                        </div>
                      </div>
                      <div className="p-2 max-h-60 overflow-y-auto">
                        {allColumns.map((column) => (
                          <div key={column} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`column-${column}`}
                              checked={visibleColumns.includes(column)}
                              onChange={() => toggleColumnVisibility(column)}
                              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`column-${column}`}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {column.charAt(0).toUpperCase() + column.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading {typeLabelPlural.toLowerCase()}...
                </p>
              </div>
            ) : isError || !filteredParties || filteredParties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Icon
                  icon="solar:users-group-broken"
                  className="w-16 h-16 text-gray-300 dark:text-gray-600"
                />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {isError
                    ? `Error loading ${typeLabelPlural.toLowerCase()}`
                    : `No ${typeLabelPlural.toLowerCase()} found`}
                </p>
                <Link
                  href={`${linkToCreateParty}?type=${type}`}
                  className="mt-4"
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                  >
                    <Icon icon="solar:add-circle-bold" className="text-lg" />
                    Add Your First {typeLabel}
                  </button>
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                  <tr>
                    {visibleColumns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-4 py-3 whitespace-nowrap"
                      >
                        {column}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParties?.map((party, index) => (
                    <tr
                      key={party.id}
                      className={`border-b dark:border-gray-700 ${
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-gray-50 dark:bg-gray-700'
                      } hover:bg-gray-100 dark:hover:bg-gray-600`}
                    >
                      {visibleColumns.map((column) => (
                        <td
                          key={`${party.id}-${column}`}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          {column === 'createdAt' || column === 'updatedAt'
                            ? formatDate(party[column])
                            : party[column] || ''}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/accounts/invoice/parties/add-party?id=${party.id}&type=${type}`}
                            className="text-sky-500 hover:text-sky-700 transition-colors"
                            title={`Edit ${typeLabel}`}
                          >
                            <Icon icon="solar:pen-bold" className="text-lg" />
                          </Link>

                          {deleteConfirm === party.id ? (
                            <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 p-1 rounded">
                              <button
                                onClick={() => handleDeleteParty(party.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Confirm Delete"
                              >
                                <Icon
                                  icon="solar:check-circle-bold"
                                  className="text-lg"
                                />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                title="Cancel"
                              >
                                <Icon
                                  icon="solar:close-circle-bold"
                                  className="text-lg"
                                />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(party.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title={`Delete ${typeLabel}`}
                            >
                              <Icon
                                icon="solar:trash-bin-trash-bold"
                                className="text-lg"
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination (placeholder for future implementation) */}
          {filteredParties?.length > 0 && (
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {filteredParties?.length || 0}
                </span>{' '}
                {typeLabelPlural.toLowerCase()}
              </div>
              <div className="flex gap-2">
                <button
                  disabled
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md border border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                >
                  Previous
                </button>
                <button
                  disabled
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md border border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
