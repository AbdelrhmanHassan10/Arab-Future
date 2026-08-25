import { cookies } from "next/headers";
import { FiUsers, FiBox, FiTool, FiDollarSign } from "react-icons/fi";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";
import Link from "next/link";

async function getDashboardData() {
  try {
    const data = await fetchApi("/admin/dashboard", {
      cache: 'no-store'
    });
    return data;
  } catch (error) {
    return null;
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  if (!data) {
    return <div className="text-center py-20 text-red-500 font-bold">فشل في تحميل بيانات لوحة التحكم. تأكد من عمل الخادم (Laravel).</div>;
  }

  // Assuming data structure based on typical Laravel responses:
  // data = { stats: { total_units, total_renovation, sold_units, new_requests }, recent_requests: [], recent_units: [] }
  const stats = [
    { label: "إجمالي الوحدات", value: data.stats?.total_units || 0, icon: FiBox, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "مشاريع التشطيب", value: data.stats?.total_renovation || 0, icon: FiTool, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "الوحدات المباعة", value: data.stats?.sold_units || 0, icon: FiDollarSign, color: "text-green-500", bg: "bg-green-100" },
    { label: "الطلبات الجديدة", value: data.stats?.new_requests || 0, icon: FiUsers, color: "text-orange-500", bg: "bg-orange-100" },
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
            <Link href="/admin/units" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="p-0">
            {data.recent_units?.map((unit: any) => (
              <div key={unit.id} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={getImageUrl(unit.main_image || unit.image, 0)} alt={unit.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark line-clamp-1">{unit.title}</h4>
                    <p className="text-xs text-gray-500">
                      {unit.address || (typeof unit.location === 'object' ? unit.location?.name : unit.location) || (typeof unit.area === 'object' ? unit.area?.name : unit.area)}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${unit.status === "available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {unit.status === "available" ? "متاحة" : unit.status}
                  </span>
                </div>
              </div>
            ))}
            {(!data.recent_units || data.recent_units.length === 0) && (
              <div className="p-6 text-center text-gray-500">لا توجد وحدات حتى الآن</div>
            )}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-navy-dark text-lg">أحدث الطلبات</h3>
            <Link href="/admin/requests" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="p-0">
            {data.recent_requests?.map((req: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy-deeper text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {req.name?.charAt(0) || '-'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark">{req.name}</h4>
                    <p className="text-xs text-gray-500">{req.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">
                    {new Date(req.created_at || req.time).toLocaleDateString('ar-EG')}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.status === "new" || req.status === "جديد" ? "bg-orange-100 text-orange-600" :
                    req.status === "under_review" || req.status === "قيد المراجعة" ? "bg-blue-100 text-blue-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                    {req.status === 'new' ? 'جديد' : req.status === 'under_review' ? 'قيد المراجعة' : req.status === 'completed' ? 'مكتمل' : req.status}
                  </span>
                </div>
              </div>
            ))}
            {(!data.recent_requests || data.recent_requests.length === 0) && (
              <div className="p-6 text-center text-gray-500">لا توجد طلبات حتى الآن</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
