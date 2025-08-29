export const SkeletonNote = () => (
  <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md w-full animate-pulse flex flex-col gap-2">
    {/* Title Skeleton */}
    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    {/* Content Skeleton */}
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    {/* Action buttons skeleton */}
    <div className="flex gap-2 mt-2">
      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);
