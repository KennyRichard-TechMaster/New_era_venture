export type InquiryStatus = "new" | "read" | "replied";

export type InquiryMessage = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type InquiryDraft = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const STORAGE_KEY = "nev_local_inquiries";

const defaultInquiries: InquiryMessage[] = [
  {
    id: "sample-1",
    fullName: "Ada Johnson",
    email: "ada@brightlaunch.io",
    phone: "+1 (555) 234-9900",
    company: "BrightLaunch",
    service: "Website Design",
    budget: "$3,000 - $6,000",
    message:
      "We need a professional website for our startup launch, including branding, project portfolio, and contact forms.",
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "sample-2",
    fullName: "Samuel Okafor",
    email: "sam@westbridge.ng",
    phone: "+234 810 400 2288",
    company: "WestBridge",
    service: "Custom Web App",
    budget: "$8,000 - $12,000",
    message:
      "We want a custom dashboard and client portal with authentication, reporting, and integrations.",
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

function readStorage(): InquiryMessage[] {
  if (typeof window === "undefined") {
    return defaultInquiries;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInquiries));
      return [...defaultInquiries];
    }

    const parsed = JSON.parse(raw) as InquiryMessage[];
    return Array.isArray(parsed) && parsed.length ? parsed : defaultInquiries;
  } catch {
    return [...defaultInquiries];
  }
}

export function getInquiries(): InquiryMessage[] {
  return readStorage();
}

export function saveInquiry(draft: InquiryDraft): InquiryMessage {
  const next: InquiryMessage = {
    id: crypto.randomUUID(),
    fullName: draft.fullName.trim(),
    email: draft.email.trim(),
    phone: draft.phone.trim(),
    company: draft.company.trim(),
    service: draft.service.trim(),
    budget: draft.budget.trim(),
    message: draft.message.trim(),
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const list = [...readStorage(), next];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return next;
}

export function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): InquiryMessage[] {
  const list = readStorage().map((item) =>
    item.id === id
      ? { ...item, status, updatedAt: new Date().toISOString() }
      : item,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function deleteInquiry(id: string): InquiryMessage[] {
  const list = readStorage().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}
