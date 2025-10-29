'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Building2,
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { StatCard } from '@/components/StatCard';
import { RevenueChart } from '@/components/RevenueChart';
import { DepartmentTable } from '@/components/DepartmentTable';
import { PatientDemographics } from '@/components/PatientDemographics';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type {
  OverviewMetrics,
  RevenueData,
  PatientStatistics,
  DepartmentPerformance,
} from '@/types/analytics';

export default function DashboardPage() {
  const [overview, setOverview] = useState<OverviewMetrics | null>(null);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [patients, setPatients] = useState<PatientStatistics | null>(null);
  const [departments, setDepartments] = useState<DepartmentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [overviewData, revenueData, patientsData, departmentsData] =
          await Promise.all([
            apiClient.getOverview(),
            apiClient.getRevenue(),
            apiClient.getPatientStatistics(),
            apiClient.getDepartmentPerformance(),
          ]);

        setOverview(overviewData);
        setRevenue(revenueData);
        setPatients(patientsData);
        setDepartments(departmentsData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(
          'Failed to load dashboard data. Please ensure the backend API is running.',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <Activity className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Medical Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Real-time healthcare metrics and insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Period</p>
                <p className="text-sm font-medium text-gray-900">
                  {overview?.period.startDate} - {overview?.period.endDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={formatNumber(overview?.totalPatients || 0)}
            change={`+${overview?.newPatients || 0} new`}
            changeType="positive"
            icon={Users}
            iconColor="bg-blue-500"
          />
          <StatCard
            title="Total Appointments"
            value={formatNumber(overview?.totalAppointments || 0)}
            change={`${overview?.completedAppointments || 0} completed`}
            changeType="positive"
            icon={Calendar}
            iconColor="bg-green-500"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(overview?.totalRevenue || 0)}
            change={`${formatCurrency(overview?.averageRevenuePerPatient || 0)} avg/patient`}
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-yellow-500"
          />
          <StatCard
            title="Departments"
            value={departments.length}
            change="Active departments"
            changeType="neutral"
            icon={Building2}
            iconColor="bg-purple-500"
          />
        </div>

        {/* Revenue Chart */}
        {revenue.length > 0 && (
          <div className="mb-8">
            <RevenueChart data={revenue} />
          </div>
        )}

        {/* Patient Demographics */}
        {patients && (
          <div className="mb-8">
            <PatientDemographics data={patients} />
          </div>
        )}

        {/* Department Performance Table */}
        {departments.length > 0 && (
          <div className="mb-8">
            <DepartmentTable data={departments} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Built with Next.js, Nest.js, PostgreSQL & TypeScript
            </p>
            <p className="text-sm text-gray-600">
              © 2024 Ayokunle Ademola-John
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
