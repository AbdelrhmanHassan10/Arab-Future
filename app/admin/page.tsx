"use client";

import { FiUsers, FiBox, FiTool, FiDollarSign } from "react-icons/fi";
import { unitsData } from "@/lib/units";
import { finishingProjects } from "@/lib/finishing";

export default function AdminDashboard() {
  const stats = [
    { label: "إجمالي الوحدات", value: unitsData.length, icon: FiBox, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "مشاريع التشطيب", value: finishingProjects.length, icon: FiTool, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "الوحدات المباعة", value: unitsData.filter(u => u.status === "sold").length, icon: FiDollarSign, color: "text-green-500", bg: "bg-green-100" },
    { label: "الطلبات الجديدة", value: "12", icon: FiUsers, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">نظرة عامة</h1>
          <p className="text-gray-500 text-sm">مرحباً بك في لوحة تحكم سمسار بني سويف</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-navy-dark">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Recent Units */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-navy-dark text-lg">أحدث الوحدات المضافة</h3>
            <a href="/admin/units" className="text-sm text-primary font-bold hover:underline">عرض الكل</a>
          </div>
          <div className="p-0">
            {unitsData.slice(0, 4).map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={unit.image} alt={unit.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark line-clamp-1">{unit.title}</h4>
                    <p className="text-xs text-gray-500">{unit.location}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${unit.status === "available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {unit.status === "available" ? "متاحة" : "تم البيع"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-navy-dark text-lg">أحدث الطلبات</h3>
            <a href="/admin/requests" className="text-sm text-primary font-bold hover:underline">عرض الكل</a>
          </div>
          <div className="p-0">
            {[
              { name: "أحمد محمود", type: "طلب معاينة شقة", time: "منذ ساعتين", status: "جديد" },
              { name: "سارة حسن", type: "استفسار عن باقة تشطيب", time: "منذ 5 ساعات", status: "قيد المراجعة" },
              { name: "محمد علي", type: "طلب شراء فيلا", time: "أمس", status: "مكتمل" },
              { name: "عمر فاروق", type: "طلب معاينة تجاري", time: "أمس", status: "جديد" },
            ].map((req, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy-deeper text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {req.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark">{req.name}</h4>
                    <p className="text-xs text-gray-500">{req.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">{req.time}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === "جديد" ? "bg-orange-100 text-orange-600" :
                    req.status === "قيد المراجعة" ? "bg-blue-100 text-blue-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
