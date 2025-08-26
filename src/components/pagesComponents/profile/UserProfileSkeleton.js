'use client';

// This component displays skeleton loaders for the UserProfile component while data is being fetched
// It provides a better user experience by showing a loading state instead of a blank screen

const UserProfileSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-9 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
      
      {/* Form fields skeleton */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="mb-3">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex justify-end mt-6 space-x-3">
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
