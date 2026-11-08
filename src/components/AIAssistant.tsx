import { FormEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import assistantImage from "../../1043357438679799054-removebg-preview.png";

type Reply = {
  answer: string;
  related: string[];
};

type Position = {
  x: number;
  y: number;
};

const ASSISTANT_SIZE = 80;
const VIEWPORT_MARGIN = 16;
const CHAT_WIDTH = 384;
const CHAT_HEIGHT = 590;
const POSITION_STORAGE_KEY = "nova-assistant-position";

const knowledgeBase: Record<string, Reply> = {
  "What services do you offer?": {
    answer:
      "We help businesses with web development, mobile apps, UI/UX design, branding, SEO and growth, and technology consulting. Each project is shaped around your business goal rather than a one-size-fits-all package.",
    related: ["How much does a project cost?", "How long will my project take?"],
  },
  "How much does a project cost?": {
    answer:
      "Website projects generally begin around $1,200. Larger websites, e-commerce stores, applications, and custom systems are scoped around the features and outcomes you need. Send us a short brief and we will provide a tailored estimate.",
    related: ["How do I get a quote?", "How long will my project take?"],
  },
  "How long will my project take?": {
    answer:
      "Most focused websites take 2–6 weeks. More involved platforms and applications can take longer, depending on the features, content, and feedback cycle. We agree on a clear timeline before work starts.",
    related: ["What services do you offer?", "Do you offer ongoing support?"],
  },
  "Do you offer ongoing support?": {
    answer:
      "Yes. We can support updates, performance improvements, content changes, and new features after launch, so your digital presence stays useful as your business grows.",
    related: ["Can you improve my existing website?", "How do I get a quote?"],
  },
  "Can you improve my existing website?": {
    answer:
      "Absolutely. We can audit the experience, improve design and messaging, resolve performance issues, strengthen SEO, or rebuild the parts that are holding your business back.",
    related: ["Do you offer ongoing support?", "What services do you offer?"],
  },
  "How do I get a quote?": {
    answer:
      "Use the contact page to tell us about your business, what you need, your timeline, and your budget range. We will review the brief and reply with recommended next steps and a custom estimate.",
    related: ["How much does a project cost?", "What should I prepare before we start?"],
  },
  "What should I prepare before we start?": {
    answer:
      "A short overview of your business, your goals, ideal customers, examples you like, available brand assets, and any must-have features are a great start. Do not worry if you do not have everything—we can guide the discovery process.",
    related: ["How do I get a quote?", "How long will my project take?"],
  },
  "Do you work with startups?": {
    answer:
      "Yes. We work with startups, growing companies, and established teams. We can help validate an idea, shape an MVP, improve an existing product, or create a stronger brand presence.",
    related: ["What services do you offer?", "How do I get a quote?"],
  },
};

const starters = [
  "What services do you offer?",
  "How much does a project cost?",
  "How long will my project take?",
  "Do you work with startups?",
];

function getReply(question: string): Reply {
  const normalized = question.toLowerCase();
  const direct = Object.entries(knowledgeBase).find(([topic]) =>
    normalized.includes(topic.toLowerCase().replace("?", "")),
  );

  if (direct) return direct[1];
  if (/(price|cost|budget|fee)/.test(normalized)) return knowledgeBase["How much does a project cost?"];
  if (/(time|timeline|long|week)/.test(normalized)) return knowledgeBase["How long will my project take?"];
  if (/(support|maintain|update)/.test(normalized)) return knowledgeBase["Do you offer ongoing support?"];
  if (/(quote|contact|start|begin)/.test(normalized)) return knowledgeBase["How do I get a quote?"];
  if (/(service|build|website|app|design|seo)/.test(normalized)) return knowledgeBase["What services do you offer?"];

  return {
    answer:
      "I can help with services, pricing, timelines, project preparation, website improvements, and getting a quote. Choose a question below or tell me what you are planning to build.",
    related: starters.slice(0, 3),
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [question, setQuestion] = useState("");
  const dragOffset = useRef({ x: 0, y: 0 });
  const pressOrigin = useRef({ x: 0, y: 0 });
  const movedDuringPress = useRef(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Hi! I’m Nova, New Era Ventures’ virtual assistant. What would you like to know?",
    },
  ]);
  const [related, setRelated] = useState(starters);

  const latestRelated = useMemo(() => related.slice(0, 3), [related]);

  useEffect(() => {
    const clampPosition = (candidate: Position): Position => ({
      x: Math.min(Math.max(VIEWPORT_MARGIN, candidate.x), window.innerWidth - ASSISTANT_SIZE - VIEWPORT_MARGIN),
      y: Math.min(Math.max(VIEWPORT_MARGIN, candidate.y), window.innerHeight - ASSISTANT_SIZE - VIEWPORT_MARGIN),
    });

    const saved = window.localStorage.getItem(POSITION_STORAGE_KEY);
    let initialPosition = { x: window.innerWidth - 104, y: window.innerHeight - 120 };

    if (saved) {
      try {
        initialPosition = JSON.parse(saved) as Position;
      } catch {
        window.localStorage.removeItem(POSITION_STORAGE_KEY);
      }
    }

    setPosition(clampPosition(initialPosition));
    const handleResize = () => setPosition((current) => (current ? clampPosition(current) : current));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (position) window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
  }, [position]);

  const ask = (value: string) => {
    const cleanQuestion = value.trim();
    if (!cleanQuestion) return;
    const reply = getReply(cleanQuestion);
    setMessages((current) => [
      ...current,
      { role: "user", text: cleanQuestion },
      { role: "assistant", text: reply.answer },
    ]);
    setRelated(reply.related);
    setQuestion("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    dragOffset.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    pressOrigin.current = { x: event.clientX, y: event.clientY };
    movedDuringPress.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    if (
      Math.abs(event.clientX - pressOrigin.current.x) < 5 &&
      Math.abs(event.clientY - pressOrigin.current.y) < 5
    ) return;
    const x = Math.min(Math.max(VIEWPORT_MARGIN, event.clientX - dragOffset.current.x), window.innerWidth - ASSISTANT_SIZE - VIEWPORT_MARGIN);
    const y = Math.min(Math.max(VIEWPORT_MARGIN, event.clientY - dragOffset.current.y), window.innerHeight - ASSISTANT_SIZE - VIEWPORT_MARGIN);
    movedDuringPress.current = true;
    setPosition({ x, y });
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const panelStyle = position
    ? {
        left: Math.min(
          Math.max(VIEWPORT_MARGIN, position.x + ASSISTANT_SIZE - CHAT_WIDTH),
          window.innerWidth - CHAT_WIDTH - VIEWPORT_MARGIN,
        ),
        top: Math.min(
          Math.max(VIEWPORT_MARGIN, position.y - CHAT_HEIGHT - VIEWPORT_MARGIN),
          window.innerHeight - Math.min(CHAT_HEIGHT, window.innerHeight - VIEWPORT_MARGIN * 2) - VIEWPORT_MARGIN,
        ),
      }
    : undefined;

  return (
    <div className="fixed z-[70]" style={position ? { left: position.x, top: position.y } : { right: "1.75rem", bottom: "1.75rem"}}>
      <style>{`@keyframes assistant-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } .assistant-float { animation: assistant-float 3.2s ease-in-out infinite; }`}</style>
      {open && (
        <section style={panelStyle} className="fixed z-[71] flex max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[28px] border border-orange-200 bg-white shadow-[0_24px_80px_rgba(124,45,18,0.28)]">
          <header className="flex items-center justify-between bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
                <Bot size={21} />
              </div>
              <div>
                <h2 className="font-bold">Ask Nova</h2>
                <p className="text-xs text-orange-100">Your digital project guide</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 transition hover:bg-white/15" aria-label="Close AI assistant">
              <X size={19} />
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-orange-50/60 p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-slate-900 text-white" : "rounded-bl-sm border border-orange-100 bg-white text-slate-700 shadow-sm"}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-orange-100 bg-white p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">Popular questions</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {latestRelated.map((item) => (
                <button key={item} type="button" onClick={() => ask(item)} className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-left text-xs font-medium text-orange-800 transition hover:bg-orange-100">
                  {item}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <label className="sr-only" htmlFor="assistant-question">Ask a question</label>
              <input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question..." className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500" />
              <button type="submit" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600" aria-label="Send question">
                <Send size={17} />
              </button>
            </form>
          </div>
        </section>
      )}

      <button type="button" onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onClick={() => { if (!movedDuringPress.current) setOpen((current) => !current); }} className="assistant-float group relative flex h-20 w-20 touch-none cursor-grab items-center justify-center bg-transparent p-0 active:cursor-grabbing" aria-label={open ? "Close AI assistant" : "Open AI assistant"}>
        <img src={assistantImage} alt="Open Nova AI assistant" className="h-[88px] w-auto max-w-none transition-transform duration-300 group-hover:scale-105" />
      </button>
    </div>
  );
}
