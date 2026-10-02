export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceParty {
  name: string;
  company: string;
  email: string;
  address: string;
}

export interface InvoiceTemplateData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  sender: InvoiceParty;
  client: InvoiceParty;
  items: InvoiceItem[];
  taxRate?: number;
  notes?: string;
}

export interface CertificateTemplateData {
  recipientName: string;
  courseTitle: string;
  organizationName: string;
  date: string;
  certificateId: string;
  instructorName: string;
  directorName: string;
}

export interface BusinessReportMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface BusinessReportTemplateData {
  companyName: string;
  reportTitle: string;
  quarter: string;
  year: number;
  preparedBy: string;
  summaryText: string;
  metrics: BusinessReportMetric[];
  highlights: string[];
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeTemplateData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}
