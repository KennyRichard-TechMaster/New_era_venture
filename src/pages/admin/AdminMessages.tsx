import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, User, Building2, Clock3, Trash2 } from "lucide-react";
import {
  deleteInquiry,
  getInquiries,
  InquiryMessage,
  updateInquiryStatus,
} from "../../lib/siteStorage";

export default function AdminMessages() {
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);

  const refresh = () => setInquiries(getInquiries());

  useEffect(() => {
    refresh();
  }, []);

  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      newCount: inquiries.filter((item) => item.status === "new").length,
      readCount: inquiries.filter((item) => item.status === "read").length,
    };
  }, [inquiries]);

  const markStatus = (id: string, status: "new" | "read" | "replied") => {
    setInquiries(updateInquiryStatus(id, status));
  };

  const remove = (id: string) => {
    setInquiries(deleteInquiry(id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Inbox
          </p>
          <h2 className="mt-3 text-3xl font-black text-white">
            Client inquiries
          </h2>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="text-sm text-slate-400">Total</div>
          <div className="mt-3 text-3xl font-black text-white">
            {stats.total}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="text-sm text-slate-400">New</div>
          <div className="mt-3 text-3xl font-black text-white">
            {stats.newCount}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="text-sm text-slate-400">Read</div>
          <div className="mt-3 text-3xl font-black text-white">
            {stats.readCount}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
            No messages yet.
          </div>
        ) : (
          inquiries.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                      <User size={18} />
                    </span>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {item.fullName}
                      </div>
                      <div className="text-sm text-slate-400">
                        {item.service}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-slate-500" /> {item.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-slate-500" />{" "}
                      {item.phone || "Not supplied"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={15} className="text-slate-500" />{" "}
                      {item.company || "Not supplied"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 size={15} className="text-slate-500" />{" "}
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950 p-4 text-sm leading-7 text-slate-300">
                    {item.message}
                  </div>
                </div>

                <div className="flex w-full max-w-xs flex-col gap-3 lg:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${item.status === "new" ? "bg-orange-500/15 text-orange-300" : item.status === "read" ? "bg-cyan-500/15 text-cyan-300" : "bg-green-500/15 text-green-300"}`}
                  >
                    {item.status}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => markStatus(item.id, "read")}
                      className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      Mark read
                    </button>
                    <button
                      onClick={() => markStatus(item.id, "replied")}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
                    >
                      Replied
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} className="inline" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
