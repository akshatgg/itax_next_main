'use client';

import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import userbackAxios from '@/lib/userbackAxios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaUsers, FaUserShield, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { HiUsers, HiUserAdd, HiRefresh } from 'react-icons/hi';
import { MdAdminPanelSettings } from 'react-icons/md';
import Pagination from '@/components/navigation/Pagination';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import CreateAdmin from './CreateAdmin';
import Modal from '@/components/ui/Modal';
import AdminUserTable from '@/components/ui/AdminUserTable';
import { adminTableColumns, getAdminTableColumnsWithActions } from '@/components/ui/tableColumns';

const Alladmin = () => {
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState({
    userCount: 0,
    pageCount: 0,
  });

  // FETCHES USERS - Only Admin users, not Super Admins
  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userbackAxios.get(
        `/user/get-all-admins?page=${currentPage}&order=desc`,
      );
      if (status === 200 && data && data.data) {
        // Filter to show only admin users, not super admins
        const adminUsers = data.data.filter(user => user.userType === 'admin');
        setAdmin(adminUsers);
        setTotalUser({
          userCount: adminUsers.length,
          pageCount: data.page,
        });
      }
    } catch (error) {
      console.log('🚀 ~ getAllUsers ~ error:', error);
      toast.error('Error getting admins');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  // const handleDeleteUser = async (id) => {
  //   try {
  //     if (window.confirm('Are you sure you want to delete')) {
  //       setIsLoading(true);
  //       const { status } = await userAxios.delete(`/user/delete-user/${id}`);
  //       if (status === 200) {
  //         toast.success('User deleted successfully');
  //       }
  //     }
  //   } catch (error) {
  //     toast.error('Error deleting user');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Filter admin data based on search (only admin users)
  const filteredAdmin = admin.filter((user) => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    
    // Only show admin users, filterRole is removed since we only show admins
    return matchesSearch && user.userType === 'admin';
  });

  useEffect(() => {
    getAllUsers();
  }, [currentPage, setCurrentPage, getAllUsers]);

  return (
    <>
      <DashSection
        title={
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <FaUserShield className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-700">Admin Management</h1>
              <p className="text-sm text-gray-500">Manage system administrators</p>
            </div>
          </div>
        }
        titleRight={
          <div className="flex items-center gap-3">
            <Button 
              onClick={getAllUsers} 
              className={`${BTN_SIZES['sm']} bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 transition-all duration-200 flex items-center gap-2 shadow-sm`}
              disabled={isLoading}
            >
              <HiRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button 
              onClick={() => setModal(true)} 
              className={`${BTN_SIZES['md-1']} bg-blue-500 hover:bg-blue-600 text-white border-none transition-all duration-200 flex items-center gap-2 shadow-sm`}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Admin</span>
            </Button>
          </div>
        }
      >
        {/* Stats Cards - Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Admins</p>
                <p className="text-3xl font-semibold text-gray-800">{totalUser.userCount || 0}</p>
                <p className="text-xs text-gray-500 mt-1">System administrators</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <FaUserShield className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-green-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Admins</p>
                <p className="text-3xl font-semibold text-gray-800">{admin.filter(a => a.status === 'active').length || admin.length}</p>
                <p className="text-xs text-gray-500 mt-1">Currently active</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <HiUsers className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Section - Light Theme */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search admins by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <span className="font-medium">{filteredAdmin.length}</span> of <span className="font-medium">{admin.length}</span> admins
              </div>
            </div>
          </div>
        </div>
        <Modal
          className={'md:max-w-[950px]'}
          title={
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                <HiUserAdd className="text-blue-500 text-lg" />
              </div>
              <span className="text-xl font-semibold text-gray-700">
                {currentRow ? 'Update Admin' : 'Add New Admin'}
              </span>
            </div>
          }
          onClose={() => {
            if (currentRow) {
              setCurrentRow(null);
            }
            setModal(false);
          }}
          isOpen={modal}
        >
          <CreateAdmin
            currentRow={currentRow}
            onRefresh={getAllUsers}
            onClose={() => {
              if (currentRow) {
                setCurrentRow(null);
              }
              setModal(false);
            }}
          />
        </Modal>

        {/* Table Section using AdminUserTable Component */}
        <AdminUserTable
          data={filteredAdmin}
          columns={getAdminTableColumnsWithActions((row) => (
            <div className="flex items-center gap-2">
              <Button
                className={`${BTN_SIZES['sm']} bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-all duration-200 flex items-center gap-1`}
                onClick={() => {
                  setCurrentRow(row);
                  setModal(true);
                }}
              >
                <FaEdit className="w-3 h-3" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </div>
          ))}
          isLoading={isLoading}
          isError={false}
          tableTitle="Admin List"
          emptyMessage="No admins found matching your criteria."
          loadingMessage="Loading admins..."
          errorMessage="Error loading admins. Please try again."
          getRoleBadge={() => 'bg-blue-50 text-blue-600 border-blue-100'}
          formatRole={() => 'Administrator'}
          tableType="admin"
        />

        {/* Pagination - Light Theme */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100">
            Showing <span className="font-medium text-gray-700">{Math.min((currentPage * 10) + 1, totalUser.userCount)}</span> to <span className="font-medium text-gray-700">{Math.min((currentPage + 1) * 10, totalUser.userCount)}</span> of <span className="font-medium text-gray-700">{totalUser.userCount}</span> admins
          </div>
          <Pagination
            currentPage={currentPage + 1}
            setCurrentPage={setCurrentPage}
            totalPages={totalUser.pageCount}
          />
        </div>
      </DashSection>
    </>
  );
};

// function Pagination(prop) {
//   const { page, setPage, totalPages } = prop;
//   return (
//     <nav className="flex justify-center my-8">
//       <ul className="inline-flex -space-x-px text-base h-10">
//         <li>
//           <button
//             className=" cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             disabled={+page === 0}
//             onClick={() => setPage((prev) => +prev - 1)}
//           >
//             Prev
//           </button>
//         </li>
//         <li>
//           <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//             {page}
//           </span>
//         </li>
//         <li>
//           <button
//             className=" cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//             onClick={() => setPage((prev) => +prev + 1)}
//             disabled={+totalPages === +page + 1}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default Alladmin;
