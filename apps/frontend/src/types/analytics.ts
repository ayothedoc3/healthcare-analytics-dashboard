export interface OverviewMetrics {
  totalPatients: number;
  newPatients: number;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  averageRevenuePerPatient: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface RevenueData {
  date: string;
  department: string;
  total: number;
}

export interface PatientStatistics {
  ageGroups: {
    ageGroup: string;
    count: number;
  }[];
  genderDistribution: {
    gender: string;
    count: number;
  }[];
}

export interface AppointmentTrend {
  date: string;
  status: string;
  count: number;
}

export interface DepartmentPerformance {
  department: string;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
}

export interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
  department?: string;
}
