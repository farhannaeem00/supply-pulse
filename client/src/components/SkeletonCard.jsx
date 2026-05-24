export default function SkeletonCard() {
  return (
    <div className="px-5 py-4 border-b border-gray-800
                    flex items-center justify-between gap-3 animate-pulse">
      <div className="min-w-0 flex-1">
        <div className="h-4 bg-gray-800 rounded w-36 mb-2" />
        <div className="h-3 bg-gray-800 rounded w-24" />
      </div>
      <div className="h-6 bg-gray-800 rounded-full w-16 shrink-0" />
    </div>
  );
}