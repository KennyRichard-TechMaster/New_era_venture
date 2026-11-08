import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Zap,
  Users,
  Mail,
  Phone,
  MapPin,
  Target,
  Lightbulb,
  LayoutTemplate,
  TrendingUp,
} from "lucide-react";
import {
  aboutValues,
  blogPosts,
  faqs,
  heroStats,
  learningModules,
  portfolioProjects,
  pricingPlans,
  processSteps,
  serviceList,
  techStack,
  testimonials,
} from "../data/siteContent";

function AccentBlock({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm bg-orange-500 ${className}`}
    />
  );
}

function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.src = "https://placehold.co/1200x700/0F172A/FFFFFF?text=New+Era+Ventures";
}

function SectionShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

export function HomePage() {
  const [expandedService, setExpandedService] = React.useState<string | null>(null);

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#f4f0ee]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(249,115,22,0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,0.18), transparent 30%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
              <AccentBlock className="mt-0" />
              Digital Growth Agency
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[0.95] text-slate-950 sm:text-5xl lg:text-7xl">
              Building <span className="text-orange-500">digital futures</span>{" "}
              for ambitious brands.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              We design and build high-converting websites, mobile experiences,
              and digital systems that help businesses look premium and sell
              faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Book a Call
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                View Work
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-slate-950">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[560px] items-end justify-center lg:min-h-[640px]">
            <div className="absolute right-8 top-12 h-52 w-52 rounded-[36px] bg-orange-200/70" />
            <div className="absolute bottom-10 left-3 h-40 w-40 rounded-[32px] bg-sky-200/70" />
            <div className="absolute bottom-24 right-2 h-28 w-28 rounded-full border-[18px] border-slate-900/10" />
            <div className="relative w-full max-w-[560px]">
              <img
                src="/yesgirl-removebg-preview.png"
                alt="Excited business professional"
                className="relative z-10 h-[560px] w-full object-contain object-bottom lg:h-[640px]"
              />
              <div className="absolute left-0 top-20 z-20 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Growth
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  +340%
                </div>
              </div>
              <div className="absolute bottom-16 right-0 z-20 max-w-[190px] rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold leading-5 text-white shadow-xl">
                Built for clear, measurable momentum.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        title="Digital solutions for real businesses"
        eyebrow="What we do"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceList.map((service) => {
            const isOpen = expandedService === service.title;

            return (
              <div
                key={service.title}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-52 w-full object-cover"
                  onError={handleImageFallback}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedService((current) =>
                        current === service.title ? null : service.title,
                      )
                    }
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600"
                  >
                    {isOpen ? "Hide details" : "Learn more"}
                  </button>

                  {isOpen && (
                    <div className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-inner">
                      <p className="leading-6">{service.learnMore}</p>
                      <p className="mt-3 border-t border-slate-100 pt-3 leading-6">
                        <span className="font-bold text-slate-800">What&apos;s included: </span>
                        {service.details}
                      </p>
                      <ul className="mt-4 space-y-2 text-slate-700">
                        {service.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <AccentBlock />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionShell>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Why choose us
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Technology for a better tomorrow.
              </h2>
              <p className="mt-5 max-w-xl text-slate-300">
                We combine design thinking, code quality, and business strategy
                to build digital experiences that move your brand forward.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "UX-first design backed by research and strategy",
                  "Scalable systems built for long-term business growth",
                  "Transparent communication and dependable delivery",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <AccentBlock />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  label: "Strategy",
                text: "Positioning and planning that align your digital presence with business goals.",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
              },
              {
                label: "Design",
                text: "Elegant interfaces that simplify decisions and improve conversion.",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
              },
              {
                label: "Development",
                text: "Fast, maintainable builds that are ready for scale and future growth.",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
              },
              {
                label: "Support",
                text: "Ongoing partnership to optimize performance and new opportunities.",
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
              },
              ].map((item) => (
              <div
                key={item.label}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-28 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">
              A clear path from idea to launch
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-4 text-sm font-black text-orange-500">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionShell title="Selected projects" eyebrow="Portfolio">
        <div className="grid gap-6 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-72 w-full object-cover"
                onError={handleImageFallback}
              />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-sm font-semibold text-orange-600">
                  {project.result}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Reviews
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">
              Trusted by companies that want real momentum
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-1 text-orange-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <AccentBlock key={index} className="mt-0 h-3 w-3" />
                  ))}
                </div>
                <p className="text-slate-600">“{item.quote}”</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                Stack
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">
                Built with modern tools
              </h2>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {techStack.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionShell title="Insights for growing businesses" eyebrow="Blog">
        <div className="grid gap-6 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
            >
              <img src={post.image} alt={post.title} className="h-44 w-full object-cover" onError={handleImageFallback} />
              <div className="p-5">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <Link
                  to="/blog"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
            alt="Team meeting"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            About us
          </p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">
            We build digital experiences that move brands forward.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            New Era Ventures helps founders and businesses turn ideas into
            polished online experiences. We blend strategy, creative direction,
            and engineering to create digital systems that feel premium and
            perform at scale.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutValues.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  {item.title === "Strategy first" ? (
                    <Target size={18} />
                  ) : item.title === "Human-centered design" ? (
                    <LayoutTemplate size={18} />
                  ) : item.title === "Reliable delivery" ? (
                    <Lightbulb size={18} />
                  ) : (
                    <TrendingUp size={18} />
                  )}
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20 rounded-[32px] bg-slate-950 p-8 text-white sm:p-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              icon: <Globe size={24} />,
              title: "Vision",
              text: "To help brands become more visible, more trusted, and more profitable online.",
            },
            {
              icon: <Zap size={24} />,
              title: "Mission",
              text: "To combine design, code, and business insight into digital experiences that work.",
            },
            {
              icon: <Users size={24} />,
              title: "Approach",
              text: "To partner closely with clients and turn growth goals into measurable digital outcomes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ServicesPage() {
  const [expandedService, setExpandedService] = React.useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
        Services
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">
        Everything you need to grow online.
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">
        Whether you need a stronger brand presence, a custom app, or a complete
        digital growth system, we build the tools and experiences that help your
        business move faster.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {serviceList.map((service) => {
          const isOpen = expandedService === service.title;

          return (
            <div
              key={service.title}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
                onError={handleImageFallback}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedService((current) =>
                      current === service.title ? null : service.title,
                    )
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600"
                >
                  {isOpen ? "Hide details" : "Learn more"}
                </button>

                {isOpen && (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="leading-6">{service.learnMore}</p>
                    <p className="mt-3 border-t border-slate-200 pt-3 leading-6">
                      <span className="font-bold text-slate-800">What&apos;s included: </span>
                      {service.details}
                    </p>
                    <ul className="mt-4 space-y-2 text-slate-700">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <AccentBlock />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-20 overflow-hidden rounded-[32px] bg-slate-950 p-8 text-white sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Why clients choose us
            </p>
            <h2 className="mt-3 text-3xl font-black">
              We help you launch with confidence.
            </h2>
            <p className="mt-4 text-slate-300">
              Our team helps businesses solve the real problems that slow down
              growth: unclear positioning, poor conversion flow, weak visuals,
              outdated systems, and scattered digital tools.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Strategy",
              text: "Positioning and planning that align your digital presence with business goals.",
              image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
            },
            {
              label: "Design",
              text: "Elegant interfaces that simplify decisions and improve conversion.",
              image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
            },
            {
              label: "Development",
              text: "Fast, maintainable builds that are ready for scale and future growth.",
              image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
            },
            {
              label: "Support",
              text: "Ongoing partnership to optimize performance and new opportunities.",
              image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            },
            ].map((item) => (
            <div
              key={item.label}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-28 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
        Portfolio
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">
        Recent work made to move businesses forward.
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">
        Explore a selection of brand, website, product, and growth projects
        designed around clear outcomes and stronger customer experiences.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioProjects.map((project) => (
          <article
            key={project.name}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-60 w-full object-cover"
              onError={handleImageFallback}
            />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                {project.category}
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-900">
                {project.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-bold text-orange-600">
                {project.result}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
        Products
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">
        Flexible packages for your next digital project.
      </h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
          >
            <h2 className="text-2xl font-black text-slate-900">{plan.name}</h2>
            <p className="mt-3 text-3xl font-black text-orange-600">{plan.price}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{plan.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <AccentBlock />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Discuss this package
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">
        Ideas and insights for businesses ready to scale.
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">
        Practical digital advice, strategy notes, and growth thinking for
        positive business transformation.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full object-cover"
              onError={handleImageFallback}
            />
            <div className="p-6">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
                {post.category}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-4 text-sm font-medium text-slate-500">{post.readTime}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
        Learn
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">
        Resources, training, and digital skills for growth.
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">
        Learn the key digital building blocks that help founders, teams, and
        businesses create stronger online experiences.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {learningModules.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-[32px] bg-slate-950 p-8 text-white sm:p-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Lightbulb size={24} />,
              title: "Learn by doing",
              text: "Build practical skills with real-world business use cases.",
            },
            {
              icon: <Target size={24} />,
              title: "Train for outcomes",
              text: "Focus on conversion, strategy, and growth-minded problem solving.",
            },
            {
              icon: <TrendingUp size={24} />,
              title: "Grow with confidence",
              text: "Turn technical knowledge into better product and business decisions.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">
            Let’s build your next digital success story.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Tell us about your goals, your audience, and the kind of digital
            experience you need. We’ll help you map the right solution.
          </p>
          <div className="mt-8 space-y-5 text-slate-700">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500" />
              hello@neweraventures.com
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500" /> +234 800 000 0000
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" /> Nigeria • Remote
              worldwide
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Frequently asked questions
            </div>
            <div className="mt-6 space-y-5">
              {faqs.map((item) => (
                <div key={item.question}>
                  <div className="font-bold text-slate-900">
                    {item.question}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "Website Design",
    budget: "$1,000 - $3,000",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      service: form.service,
      budget: form.budget,
      message: form.message,
    };

    const existing = JSON.parse(
      localStorage.getItem("nev_local_inquiries") || "[]",
    );
    const next = [
      ...existing,
      {
        id: crypto.randomUUID(),
        ...payload,
        status: "new",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem("nev_local_inquiries", JSON.stringify(next));
    setSubmitted(true);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "Website Design",
      budget: "$1,000 - $3,000",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Phone number
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Company
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Service
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          >
            <option>Website Design</option>
            <option>Custom Web App</option>
            <option>Mobile App</option>
            <option>Branding</option>
            <option>SEO & Growth</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Budget
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
          >
            <option>$1,000 - $3,000</option>
            <option>$3,000 - $6,000</option>
            <option>$6,000 - $12,000</option>
            <option>$12,000+</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-700">
        Project details
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none focus:border-orange-500"
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Send inquiry
      </button>

      {submitted && (
        <p className="mt-4 text-sm font-medium text-green-600">
          Your message was saved successfully. The admin dashboard can now view
          it.
        </p>
      )}
    </form>
  );
}
