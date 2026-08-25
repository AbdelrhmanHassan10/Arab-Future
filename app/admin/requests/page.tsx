"use client";

import { FiSearch, FiCheck, FiX, FiEye, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ToastProvider";
import { useConfirm } from "@/components/ConfirmProvider";

export default function AdminRequestsPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/requests");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const fetchedRequests = data.data || data;
      setRequests(Array.isArray(fetchedRequests) ? fetchedRequests : []);
    } catch (error) {
      console.error(error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: any, newStatus: string) => {
    if (!await confirm(`هل أنت متأكد من تغيير حالة الطلب إلى: ${newStatus}؟`)) return;
    try {
      const res = await fetch(`/api/admin/requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showToast("تم تغيير حالة الطلب بنجاح", "success");
      fetchRequests();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء تغيير الحالة", "error");
    }
  };

  const handleDelete = async (id: any) => {
    if (!await confirm("هل أنت متأكد من حذف هذا الطلب نهائياً؟ لا يمكن التراجع.")) return;
    try {
      const res = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showToast("تم حذف الطلب بنجاح", "success");
      fetchRequests();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.name?.includes(searchTerm) || r.id?.toString().includes(searchTerm) || r.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-auto"
          >
            <option value="all">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="under_review">قيد المراجعة</option>
            <option value="completed">مكتمل</option>
            <option value="rejected">مرفوض</option>
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
                    <span className="font-bold text-navy-dark text-sm bg-gray-100 px-2 py-1 rounded-md">{req.code || req.lead_code || req.id}</span>
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
                    <span className="text-sm text-gray-500">{req.created_at ? new Date(req.created_at).toLocaleDateString('ar-EG') : (req.date || '-')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                      req.status === "new" ? "bg-orange-100 text-orange-600" :
                      req.status === "under_review" ? "bg-blue-100 text-blue-600" :
                      req.status === "completed" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {req.status === "new" ? "جديد" : req.status === "under_review" ? "قيد المراجعة" : req.status === "completed" ? "مكتمل" : req.status === "rejected" ? "مرفوض" : req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleUpdateStatus(req.code || req.lead_code || req.id, 'under_review')} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="قيد المراجعة">
                        <FiEye size={16} />
                      </button>
                      <button onClick={() => handleUpdateStatus(req.code || req.lead_code || req.id, 'completed')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="مكتمل">
                        <FiCheck size={16} />
                      </button>
                      <button onClick={() => handleUpdateStatus(req.code || req.lead_code || req.id, 'rejected')} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="رفض الطلب">
                        <FiX size={16} />
                      </button>
                      <button onClick={() => handleDelete(req.code || req.lead_code || req.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف نهائي">
                        <FiTrash2 size={16} />
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
