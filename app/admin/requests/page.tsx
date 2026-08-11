"use client";

import { FiSearch, FiCheck, FiX, FiEye } from "react-icons/fi";
import { useState } from "react";

export default function AdminRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockRequests = [
    { id: "REQ-001", name: "أحمد محمود", phone: "+201012345678", type: "طلب معاينة شقة", date: "2026-08-11", status: "new" },
    { id: "REQ-002", name: "سارة حسن", phone: "+201123456789", type: "استفسار عن باقة تشطيب", date: "2026-08-10", status: "pending" },
    { id: "REQ-003", name: "محمد علي", phone: "+201234567890", type: "طلب شراء فيلا", date: "2026-08-09", status: "completed" },
    { id: "REQ-004", name: "عمر فاروق", phone: "+201555555555", type: "طلب معاينة تجاري", date: "2026-08-09", status: "new" },
    { id: "REQ-005", name: "منى سالم", phone: "+201000000000", type: "طلب معاينة شقة", date: "2026-08-08", status: "rejected" },
  ];

  const filteredRequests = mockRequests.filter(r => 
    r.name.includes(searchTerm) || r.id.includes(searchTerm) || r.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">إدارة الطلبات</h1>
          <p className="text-gray-500 text-sm">متابعة طلبات العملاء والاستفسارات الواردة من الموقع.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم، الكود، أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-auto">
            <option value="all">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="pending">قيد المراجعة</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">رقم الطلب</th>
                <th className="px-6 py-4">اسم العميل</th>
                <th className="px-6 py-4">رقم الهاتف</th>
                <th className="px-6 py-4">نوع الطلب</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-navy-dark text-sm bg-gray-100 px-2 py-1 rounded-md">{req.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-navy-dark">{req.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium font-body" dir="ltr">{req.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{req.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{req.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                      req.status === "new" ? "bg-orange-100 text-orange-600" :
                      req.status === "pending" ? "bg-blue-100 text-blue-600" :
                      req.status === "completed" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {req.status === "new" ? "جديد" : req.status === "pending" ? "قيد المراجعة" : req.status === "completed" ? "مكتمل" : "مرفوض"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="عرض التفاصيل">
                        <FiEye size={16} />
                      </button>
                      <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="قبول الطلب">
                        <FiCheck size={16} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="رفض الطلب">
                        <FiX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    لا توجد طلبات تطابق بحثك.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
