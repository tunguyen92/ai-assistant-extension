export const Loading = () => {
  return (
    <div className="p-4 flex items-center gap-2 text-sm text-blue-500">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Loading...
    </div>
  );
};
