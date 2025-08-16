"use client";
import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
import userbackAxios from "@/lib/userbackAxios";
import { useCallback, useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaUser, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { HiUsers, HiUserAdd, HiRefresh } from 'react-icons/hi';
import { MdPeople } from 'react-icons/md';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import { toast } from 'react-toastify';
import AdminUserTable from '@/components/ui/AdminUserTable';
import { userTableColumns } from '@/components/ui/tableColumns';
const Allusers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // FETCHES USERS
  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const resp = await userbackAxios.get(`/user/get-all-users?page=${currentPage}`);
      console.log('Users data:', resp.data.data);
      
      if (resp.data && resp.data.data) {
        setTotalUser(resp.data.data.totalusers || 0);
        setUsers(resp.data.data.users || []);
        setTotalPages(resp.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsError(true);
      toast.error('Error getting users');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    
    // Handle case-insensitive role filtering
    const userRole = user.userType?.toLowerCase();
    const filterRoleNormalized = filterRole.toLowerCase();
    const matchesRole = filterRole === 'all' || userRole === filterRoleNormalized || 
      (filterRoleNormalized === 'superadmin' && userRole === 'superadmin');
    
    return matchesSearch && matchesRole;
  });

  // Get role badge styling
  const getRoleBadge = (userType) => {
    const type = userType?.toLowerCase();
    switch (type) {
      case 'superadmin':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'admin':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'normal':
        return 'bg-green-50 text-green-600 border-green-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  // Format role display name
  const formatRole = (userType) => {
    const type = userType?.toLowerCase();
    switch (type) {
      case 'superadmin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      case 'normal':
        return 'User';
      default:
        return userType || 'Unknown';
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [currentPage, getAllUsers]);

  return (
    <>
      <DashSection
        title={
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <MdPeople className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-700">User Management</h1>
              <p className="text-sm text-gray-500">Manage all system users and their roles</p>
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
          </div>
        }
      >
        {/* Stats Cards - Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-semibold text-gray-800">{totalUser || 0}</p>
                <p className="text-xs text-gray-500 mt-1">All system users</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <HiUsers className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-purple-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Super Admins</p>
                <p className="text-3xl font-semibold text-gray-800">{users.filter(u => u.userType === 'superAdmin' || u.userType === 'SuperAdmin').length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">System administrators</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <FaUserShield className="text-purple-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Admins</p>
                <p className="text-3xl font-semibold text-gray-800">{users.filter(u => u.userType === 'admin').length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Administrators</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <FaUserShield className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-green-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Regular Users</p>
                <p className="text-3xl font-semibold text-gray-800">{users.filter(u => u.userType === 'normal').length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Standard users</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <FaUser className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section - Light Theme */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="all">All Roles</option>
                  <option value="superAdmin">Super Admin</option>
                  <option value="admin">Administrator</option>
                  <option value="normal">Regular User</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
              </div>
            </div>
          </div>
        </div>
        
        {/* Table Section using AdminUserTable Component */}
        <AdminUserTable
          data={filteredUsers}
          columns={userTableColumns}
          isLoading={isLoading}
          isError={isError}
          tableTitle="User List"
          emptyMessage="No users found matching your criteria."
          loadingMessage="Loading users..."
          errorMessage="Error loading users. Please try again."
          getRoleBadge={getRoleBadge}
          formatRole={formatRole}
          tableType="user"
        />

        {/* Pagination - Light Theme */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100">
            Showing <span className="font-medium text-gray-700">{Math.min((currentPage * 10) + 1, totalUser)}</span> to <span className="font-medium text-gray-700">{Math.min((currentPage + 1) * 10, totalUser)}</span> of <span className="font-medium text-gray-700">{totalUser}</span> users
          </div>
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </DashSection>
    </>
  );
};

function Pagination(prop) {
  const { page, setPage, totalPages } = prop;
  return (
    <nav className="flex justify-center my-8">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            className=" cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={+page === 0}
            onClick={() => setPage((prev) => +prev - 1)}
          >
            Prev
          </button>
        </li>
        <li>
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {page}
          </span>
        </li>
        <li>
          <button
            className=" cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => setPage((prev) => +prev + 1)}
            disabled={+totalPages === +page + 1}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Allusers;
