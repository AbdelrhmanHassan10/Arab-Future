import { FiUsers, FiBox, FiTool, FiDollarSign } from "react-icons/fi";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";
import Link from "next/link";
import SessionExpired from "@/components/SessionExpired";
import RecentActivityClient from "./RecentActivityClient";

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
      <RecentActivityClient dashboardApi={dashboardApi} unitsList={unitsList} requestsList={requestsList} />
    </div>
  );
}
