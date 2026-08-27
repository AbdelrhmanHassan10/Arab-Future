import { FiUsers, FiBox, FiTool, FiDollarSign } from "react-icons/fi";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";
import Link from "next/link";
import SessionExpired from "@/components/SessionExpired";

async function getDashboardData() {
  try {
    const [dashboard, units, renovations, requests] = await Promise.all([
      fetchApi("/admin/dashboard", { cache: 'no-store' }).catch(() => null),
      fetchApi("/admin/units", { cache: 'no-store' }).catch(() => null),
      fetchApi("/admin/renovation-projects", { cache: 'no-store' }).catch(() => null),
      fetchApi("/admin/requests", { cache: 'no-store' }).catch(() => null),
    ]);
    return { dashboard, units, renovations, requests };
  } catch (error) {
    return null;
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  if (!data || (!data.dashboard && !data.units && !data.renovations)) {
    return <SessionExpired />;
  }

  const dashboardApi = data.dashboard?.data || data.dashboard || {};
  const unitsList = Array.isArray(data.units?.data) ? data.units.data : (Array.isArray(data.units) ? data.units : []);
  const renovationsList = Array.isArray(data.renovations?.data) ? data.renovations.data : (Array.isArray(data.renovations) ? data.renovations : []);
  const requestsList = Array.isArray(data.requests?.data) ? data.requests.data : (Array.isArray(data.requests) ? data.requests : []);

  // Calculate accurate totals from the actual lists to avoid relying on stale/hardcoded backend stats
  const totalUnits = unitsList.length || dashboardApi.stats?.total_units || 0;
  const soldUnits = unitsList.filter((u: any) => u.status === 'sold').length || dashboardApi.stats?.sold_units || 0;
  const totalRenovation = renovationsList.length || dashboardApi.stats?.total_renovation_projects || 0;
  const newRequests = requestsList.filter((r: any) => r.status === 'new' || r.status === 'جديد').length || dashboardApi.stats?.new_requests || 0;

  const stats = [
    { label: "إجمالي الوحدات", value: totalUnits, icon: FiBox, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "مشاريع التشطيب", value: totalRenovation, icon: FiTool, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "الوحدات المباعة", value: soldUnits, icon: FiDollarSign, color: "text-green-500", bg: "bg-green-100" },
    { label: "الطلبات الجديدة", value: newRequests, icon: FiUsers, color: "text-orange-500", bg: "bg-orange-100" },
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
            {(dashboardApi.recent_units || unitsList.slice(0, 5)).map((unit: any) => (
              <div key={unit.id} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={unit.main_image_url || getImageUrl(unit.main_image || unit.image, 0)} alt={unit.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark line-clamp-1">{unit.title}</h4>
                    <p className="text-xs text-gray-500">
                      {unit.address || (typeof unit.location === 'object' ? unit.location?.name : unit.location) || (typeof unit.area === 'object' ? unit.area?.name : unit.area)}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${unit.status === "available" ? "bg-green-100 text-green-600" : unit.status === "reserved" ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"}`}>
                    {unit.status === "available" ? "متاحة" : unit.status === "sold" ? "مباعة" : unit.status === "reserved" ? "محجوزة" : unit.status}
                  </span>
                </div>
              </div>
            ))}
            {(!(dashboardApi.recent_units || unitsList.slice(0, 5)) || (dashboardApi.recent_units || unitsList.slice(0, 5)).length === 0) && (
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
            {(dashboardApi.recent_requests || requestsList.slice(0, 5)).map((req: any, idx: number) => (
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
            {(!(dashboardApi.recent_requests || requestsList.slice(0, 5)) || (dashboardApi.recent_requests || requestsList.slice(0, 5)).length === 0) && (
              <div className="p-6 text-center text-gray-500">لا توجد طلبات حتى الآن</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
