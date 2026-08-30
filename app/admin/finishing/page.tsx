"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiX, FiCheckCircle, FiMaximize } from "react-icons/fi";
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
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleOpenProjectModal = async (project: any) => {
    setSelectedProject(project);
    setLoadingModal(true);
    try {
      const code = project.code || project.renovation_code || project.id;
      const res = await fetch(`/api/admin/renovation-projects/${code}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedProject(data.data || data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingModal(false);
    }
  };

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
                        <img src={project.main_image_url || `${getImageUrl(project.main_image || project.image, project.id)}?t=${timestamp}`} alt={project.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/f3f4f6/9ca3af.png?text=No+Image' }} />
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
                      <button onClick={() => handleOpenProjectModal(project)} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-navy-dark rounded-lg transition-colors inline-block" title="عرض التفاصيل">
                        <FiEye size={16} />
                      </button>
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-md transition-opacity" data-lenis-prevent>
          <div className="bg-white rounded-3xl w-full max-w-2xl flex flex-col shadow-2xl animate-fade-rise is-visible relative max-h-[90vh] overflow-hidden">
            <div className="w-full flex-1 overflow-y-auto pb-6 custom-scrollbar" data-lenis-prevent>
            
            {/* Header Image */}
            <div className="w-full h-48 bg-gray-100 relative shrink-0">
              <img 
                src={`${getImageUrl(selectedProject.main_image_url || selectedProject.main_image || selectedProject.image || (selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images[0] : null))}?t=${timestamp}`} 
                alt="Project" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/f3f4f6/9ca3af.png?text=No+Image' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="absolute bottom-4 right-6 left-6 flex justify-between items-end">
                <div>
                  <h2 className="font-bold text-white text-2xl drop-shadow-md flex items-center gap-2">
                    {selectedProject.title || "مشروع بدون عنوان"}
                    {loadingModal && <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">كود المشروع: <span className="text-primary font-bold">{selectedProject.code || selectedProject.renovation_code || selectedProject.id}</span></p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                  selectedProject.status === "completed" ? "bg-green-500/20 text-green-300 border-green-500/30" : 
                  "bg-orange-500/20 text-orange-300 border-orange-500/30"
                }`}>
                  {selectedProject.status === "completed" ? "مكتمل" : "تحت التنفيذ"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">نوع العقار</span>
                  <span className="font-bold text-navy-dark text-base">
                    {selectedProject.property_type === "apartment" ? "شقة" : selectedProject.property_type === "villa" ? "فيلا" : selectedProject.property_type === "commercial_shop" ? "محل تجاري" : selectedProject.property_type}
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">النمط (Style)</span>
                  <span className="font-bold text-navy-dark text-base">
                    {selectedProject.style_label || (selectedProject.style === 'modern' ? 'عصري' : selectedProject.style === 'neo_classic' ? 'نيو كلاسيك' : selectedProject.style)}
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">المساحة <FiMaximize/></span>
                  <span className="font-bold text-navy-dark text-base">
                    {selectedProject.area_sqm || selectedProject.area || "غير محدد"} {selectedProject.area_sqm ? "م²" : ""}
                  </span>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">مدة التنفيذ</span>
                  <span className="font-bold text-navy-dark text-base">{selectedProject.execution_duration || "غير محدد"}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1 col-span-2">
                  <span className="text-gray-400 text-xs">العنوان / الموقع</span>
                  <span className="font-bold text-navy-dark text-base truncate">{selectedProject.location || selectedProject.address || "غير محدد"}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-right mt-6">
                <h3 className="text-primary-dark font-bold mb-2 text-sm flex items-center gap-2">
                  <FiSearch className="inline-block" /> الوصف ونطاق العمل:
                </h3>
                <p className="text-navy-light font-medium leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedProject.description || "لا يوجد وصف."}
                </p>
                {selectedProject.scope_of_work && (
                   <div className="mt-3 text-sm text-navy-dark font-bold">
                     نطاق العمل: <span className="font-normal text-navy-light">{Array.isArray(selectedProject.scope_of_work) ? selectedProject.scope_of_work.join('، ') : selectedProject.scope_of_work}</span>
                   </div>
                )}
                {selectedProject.materials_used && (
                   <div className="mt-2 text-sm text-navy-dark font-bold">
                     الخامات: <span className="font-normal text-navy-light">{Array.isArray(selectedProject.materials_used) ? selectedProject.materials_used.join('، ') : selectedProject.materials_used}</span>
                   </div>
                )}
              </div>

              {/* Challenges */}
              {selectedProject.challenges && Array.isArray(selectedProject.challenges) && selectedProject.challenges.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">التحديات والحلول:</h3>
                  <div className="space-y-3">
                    {selectedProject.challenges.map((ch: any, i: number) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                        <span className="font-bold text-navy-dark text-sm block mb-1">{ch.title}</span>
                        <p className="text-gray-500 text-xs leading-relaxed">{ch.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Images Gallery */}
              {selectedProject.images && Array.isArray(selectedProject.images) && selectedProject.images.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">معرض الصور:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProject.images.map((img: string, i: number) => {
                      if (getImageUrl(img) === getImageUrl(selectedProject.main_image_url || selectedProject.main_image)) return null;
                      return (
                        <a key={i} href={getImageUrl(img)} target="_blank" rel="noreferrer" className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 block hover:opacity-80 transition-opacity">
                          <img src={getImageUrl(img)} alt={`صورة إضافية ${i + 1}`} className="w-full h-full object-cover" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
            {/* Footer */}
            <div className="p-6 pt-0 flex justify-start">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-navy-deeper text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary transition-colors"
              >
                إغلاق
              </button>
            </div>
            
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
