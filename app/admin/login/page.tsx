"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FiLock, FiMail } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(email, password);
    
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "فشل تسجيل الدخول");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-deeper flex items-center justify-center p-4 relative" dir="rtl">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-navy-dark font-arabic mb-2">تسجيل الدخول</h1>
          <p className="text-gray-500 text-sm">لوحة تحكم سمسار بني سويف</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-dark">البريد الإلكتروني</label>
            <div className="relative">
              <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-left focus:ring-2 focus:ring-primary/50 outline-none transition-all text-navy-dark"
                placeholder="admin@semsarbenisuef.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-navy-dark">كلمة المرور</label>
            <div className="relative">
              <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-left focus:ring-2 focus:ring-primary/50 outline-none transition-all text-navy-dark"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-navy-deeper font-bold py-4 rounded-xl hover:bg-[#D6AE45] transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-navy-deeper border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "الدخول إلى لوحة التحكم"
            )}
          </button>

        </form>
      </div>

    </div>
  );
}
