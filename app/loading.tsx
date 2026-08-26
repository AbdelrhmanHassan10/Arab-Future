export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#090909]/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-bold animate-pulse text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
}
