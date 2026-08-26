"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { getImageUrl } from "@/lib/config";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";
import { useConfirm } from "@/components/ConfirmProvider";

export default function AdminFinishingPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(Date.now());

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/renovation-projects");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const fetchedProjects = data.data || data;
      setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      setTimestamp(Date.now());
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: any) => {
    if (!await confirm("هل أنت متأكد من حذف هذا المشروع نهائياً؟ لا يمكن التراجع.")) return;
    try {
      const res = await fetch(`/api/admin/renovation-projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showToast("تم حذف المشروع بنجاح", "success");
      fetchProjects();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title?.includes(searchTerm) || p.id?.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">مشاريع التشطيب</h1>
          <p className="text-gray-500 text-sm">أضف، عدل، أو احذف مشاريع التشطيب في معرض الأعمال.</p>
        </div>
        <Link href="/admin/finishing/add" className="bg-primary text-navy-deeper font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm whitespace-nowrap">
          <FiPlus size={20} />
          <span>إضافة مشروع جديد</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث باسم المشروع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">الصورة / الكود</th>
                <th className="px-6 py-4">اسم المشروع</th>
                <th className="px-6 py-4">النمط (Style)</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={project.main_image_url || `${getImageUrl(project.main_image || project.image, project.id)}?t=${timestamp}`} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-navy-dark text-sm bg-gray-100 px-2 py-1 rounded-md">{project.code || project.renovation_code || project.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-navy-dark max-w-[200px] truncate">{project.title}</div>
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">{project.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      {project.style_label || project.style}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${project.status === "completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                      {project.status === "completed" ? "مكتمل" : "تحت التنفيذ"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/finishing/edit/${project.code || project.renovation_code || project.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="تعديل">
                        <FiEdit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(project.code || project.renovation_code || project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    لا توجد مشاريع تطابق بحثك.
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
