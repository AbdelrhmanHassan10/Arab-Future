"use client";

import { useEffect, useState } from "react";
import { logout } from "@/lib/auth";

export default function SessionExpired() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // We could auto logout, but it's better to show a message and let the user click
  }, []);

  const handleLoginAgain = async () => {
    setLoading(true);
    await logout();
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 font-arabic">انتهت صلاحية الجلسة</h2>
        <p className="text-gray-500 mb-8 font-arabic">
          فشل في تحميل بيانات لوحة التحكم، يبدو أن صلاحية تسجيل الدخول قد انتهت. يرجى تسجيل الدخول مرة أخرى.
        </p>
        <button
          onClick={handleLoginAgain}
          disabled={loading}
          className="w-full bg-primary text-navy-deeper font-bold py-3 px-4 rounded-xl hover:bg-[#D6AE45] transition-colors disabled:opacity-50"
        >
          {loading ? "جاري تحويلك..." : "تسجيل الدخول مرة أخرى"}
        </button>
      </div>
    </div>
  );
}
