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

  const [selectedRequest, setSelectedRequest] = useState<any>(null);

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
    const statusAr = newStatus === "new" ? "جديد" : newStatus === "completed" ? "مكتمل" : newStatus === "rejected" ? "مرفوض" : newStatus;
    if (!confirm(`هل أنت متأكد من تغيير حالة الطلب إلى: ${statusAr}؟`)) return;
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
    const matchesSearch = r.name?.includes(searchTerm) || r.id?.toString().includes(searchTerm) || r.phone?.includes(searchTerm) || false;
    const currentStatus = r.status || "new"; // Default to 'new' if status is missing
    const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">إدارة الطلبات</h1>
          <p className="text-gray-500 text-sm">متابعة طلبات العملاء والاستفسارات الواردة من الموقع.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between overflow-hidden">
        <div className="relative w-full xl:w-96 shrink-0">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم، الكود، أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 xl:pb-0 scrollbar-hide">
          {[
            { id: "all", label: "الكل" },
            { id: "new", label: "جديد" },
            { id: "completed", label: "مكتمل" },
            { id: "rejected", label: "مرفوض" },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                statusFilter === status.id 
                ? "bg-navy-dark text-white shadow-md" 
                : "bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {status.label}
            </button>
          ))}
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
                <th className="px-6 py-4 w-1/4">الرسالة</th>
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
                  <td className="px-6 py-4 max-w-xs whitespace-normal">
                    <span className="text-sm text-gray-600 block line-clamp-2" title={req.message}>{req.message || 'لا توجد رسالة'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{req.created_at ? new Date(req.created_at).toLocaleDateString('ar-EG') : (req.date || '-')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                      req.status === "new" ? "bg-orange-100 text-orange-600" :
                      req.status === "completed" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {req.status === "new" ? "جديد" : req.status === "completed" ? "مكتمل" : req.status === "rejected" ? "مرفوض" : req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedRequest(req)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="عرض التفاصيل">
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

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-dark/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-navy-dark">تفاصيل الطلب #{selectedRequest.code || selectedRequest.lead_code || selectedRequest.id}</h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-xs text-gray-500 block mb-1">اسم العميل</span>
                  <div className="font-bold text-navy-dark">{selectedRequest.name}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-xs text-gray-500 block mb-1">رقم الهاتف</span>
                  <div className="font-bold text-navy-dark" dir="ltr">{selectedRequest.phone}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl col-span-2 md:col-span-1">
                  <span className="text-xs text-gray-500 block mb-1">تاريخ الطلب</span>
                  <div className="font-bold text-navy-dark">{selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleDateString('ar-EG') : (selectedRequest.date || '-')}</div>
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <span className="text-xs text-blue-600 font-bold block mb-2">نص الرسالة / التفاصيل:</span>
                <p className="text-navy-dark text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedRequest.message || "لا توجد تفاصيل إضافية مرفقة مع هذا الطلب."}
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
