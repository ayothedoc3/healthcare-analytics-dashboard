import {
  OverviewMetrics,
  RevenueData,
  PatientStatistics,
  AppointmentTrend,
  DepartmentPerformance,
  AnalyticsQuery,
} from '@/types/analytics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private buildQueryString(params: Record<string, any>): string {
    const filtered = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    return filtered.length > 0 ? `?${filtered.join('&')}` : '';
  }

  async getOverview(query?: AnalyticsQuery): Promise<OverviewMetrics> {
    const queryString = query ? this.buildQueryString(query) : '';
    return this.fetch<OverviewMetrics>(`/analytics/overview${queryString}`);
  }

  async getRevenue(query?: AnalyticsQuery): Promise<RevenueData[]> {
    const queryString = query ? this.buildQueryString(query) : '';
    return this.fetch<RevenueData[]>(`/analytics/revenue${queryString}`);
  }

  async getPatientStatistics(query?: AnalyticsQuery): Promise<PatientStatistics> {
    const queryString = query ? this.buildQueryString(query) : '';
    return this.fetch<PatientStatistics>(`/analytics/patients${queryString}`);
  }

  async getAppointmentTrends(query?: AnalyticsQuery): Promise<AppointmentTrend[]> {
    const queryString = query ? this.buildQueryString(query) : '';
    return this.fetch<AppointmentTrend[]>(`/analytics/appointments${queryString}`);
  }

  async getDepartmentPerformance(query?: AnalyticsQuery): Promise<DepartmentPerformance[]> {
    const queryString = query ? this.buildQueryString(query) : '';
    return this.fetch<DepartmentPerformance[]>(`/analytics/departments${queryString}`);
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.fetch('/health');
  }
}

export const apiClient = new ApiClient(API_URL);
