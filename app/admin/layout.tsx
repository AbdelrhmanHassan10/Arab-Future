"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBox, FiTool, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX, FiMapPin, FiList, FiImage } from "react-icons/fi";
import { ToastProvider } from "@/components/ToastProvider";
import { ConfirmProvider } from "@/components/ConfirmProvider";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "الرئيسية", path: "/admin", icon: FiHome },
    { name: "الوحدات", path: "/admin/units", icon: FiBox },
    { name: "مشاريع التشطيب", path: "/admin/finishing", icon: FiTool },
    { name: "الطلبات", path: "/admin/requests", icon: FiMessageSquare },
    { name: "المناطق", path: "/admin/areas", icon: FiMapPin },
    { name: "المرافق", path: "/admin/amenities", icon: FiList },
    // { name: "معرض الصور", path: "/admin/gallery", icon: FiImage },
    // { name: "الإعدادات", path: "/admin/settings", icon: FiSettings },
  ];

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <ToastProvider>
      <ConfirmProvider>
        <div className="flex min-h-screen bg-gray-50 admin-dashboard" dir="rtl">

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-navy-deeper text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link href="/admin" className="text-xl font-bold font-arabic text-primary">سمسار بني سويف</Link>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-4">القائمة الرئيسية</div>
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30 shrink-0">
                  M
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white truncate">مدير النظام</div>
                  <div className="text-xs text-gray-400 truncate">admin@semsarbenisuef.com</div>
                </div>
              </div>
              <button
                onClick={async () => {
                  const { logout } = await import('@/lib/auth');
                  await logout();
                  window.location.href = '/admin/login';
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-right rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
              >
                <FiLogOut size={20} />
                <span className="font-bold text-sm">تسجيل الخروج</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Topbar */}
            <header className="bg-white h-20 border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-navy-dark">
                  <FiMenu size={24} />
                </button>
                <h2 className="text-xl font-bold text-navy-dark">لوحة التحكم</h2>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {children}
            </div>
          </main>

        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}
