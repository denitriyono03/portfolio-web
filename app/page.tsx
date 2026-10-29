import { ArrowRight, Award, BookOpen, Briefcase, Code2, ExternalLink, Github, GraduationCap, Mail, MapPin, Quote, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Reveal from '../components/Reveal';
import { Card, Section } from '../components/Section';
import { getProfile, getHighlights, getProjects, getSkills, getCareer, getOpenSource, getTestimonials, getEducation, getCertifications } from '../lib/data';

function Heatmap() {
  // Deterministic illustrative grid (26 weeks x 7 days). It visualises activity
  // shape only; connect lib/data.ts to a real API for real contribution counts.
  const weeks = Array.from({ length: 26 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const v = (w * 7 + d * 3) % 5;
      return ['bg-stone-200', 'bg-teal-100', 'bg-teal-300', 'bg-teal-500', 'bg-teal-700'][v];
    })
  );
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[520px] gap-1">
        {weeks.map((days, w) => (
          <div key={w} className="flex flex-col gap-1">
            {days.map((c, d) => (<span key={d} title="Activity level (illustrative)" className={`h-3.5 w-3.5 rounded-sm ${c}`} />))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-stone-500"><span>Less</span><span>Illustrative activity overview — swap the data source in lib/data.ts for real data.</span><span>More</span></div>
    </div>
  );
}

export default async function Home() {
  const [profile, highlights, projects, skills, career, opensource, testimonials, education, certifications] = await Promise.all([
    getProfile(), getHighlights(), getProjects(), getSkills(), getCareer(), getOpenSource(), getTestimonials(), getEducation(), getCertifications(),
  ]);
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar name={profile.name} />
      <main>
        {/* HERO */}
        <section id="home" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-12 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <Card className="h-full">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white">{profile.name.slice(0, 1)}</span>
                  <div>
                    <p className="text-sm font-semibold text-accent">{profile.availability}</p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
                    <p className="text-lg text-stone-600">{profile.role} · {profile.location}</p>
                  </div>
                </div>
                <p className="mt-6 text-xl font-medium leading-relaxed">{profile.tagline}</p>
                <p className="mt-3 leading-relaxed text-stone-600">{profile.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white hover:bg-teal-800">See selected work <ArrowRight size={18} /></a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 font-medium hover:border-accent hover:text-accent"><Github size={18} /> GitHub</a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 font-medium hover:border-accent hover:text-accent"><Mail size={18} /> Contact</a>
                </div>
                <p className="mt-5 flex items-center gap-2 text-sm text-stone-500"><MapPin size={16} /> {profile.location} · <span>{profile.githubUsername} on GitHub</span></p>
              </Card>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {profile.stats.map((s) => (
                <Reveal key={s.label}><Card className="h-full"><p className="text-3xl font-bold text-accent">{s.value}</p><p className="mt-2 text-sm leading-snug text-stone-600">{s.label}</p></Card></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HEATMAP */}
        <Section id="activity" eyebrow="Activity" title="Contribution overview">
          <Card><Heatmap /></Card>
        </Section>

        {/* TRUSTED STRIP */}
        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-6 sm:px-6">
            <span className="mr-2 text-sm font-semibold text-stone-500">Working with</span>
            {profile.trusted.map((t) => (<span key={t} className="rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium">{t}</span>))}
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <Section id="highlights" eyebrow="Hot highlights" title="What is new and notable">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((h) => (<Reveal key={h.title}><Card className="h-full"><span className="inline-flex items-center gap-1 rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-teal-800"><Sparkles size={14} /> {h.tag}</span><h3 className="mt-4 text-lg font-bold leading-snug">{h.title}</h3><p className="mt-2 text-sm leading-relaxed text-stone-600">{h.description}</p></Card></Reveal>))}
          </div>
        </Section>

        {/* ABOUT + PHILOSOPHY + DOMAINS */}
        <Section id="about" eyebrow="About" title="Engineering philosophy">
          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal><Card className="h-full"><h3 className="text-lg font-bold">Ship the smallest useful thing</h3><p className="mt-2 text-sm leading-relaxed text-stone-600">Start with a working core, verify it, then grow it. A feature that runs beats a feature that only exists in a plan.</p></Card></Reveal>
            <Reveal><Card className="h-full"><h3 className="text-lg font-bold">Be honest about limits</h3><p className="mt-2 text-sm leading-relaxed text-stone-600">Every project page and README here says what is done and what is not yet done — integrations, signing, and backends included.</p></Card></Reveal>
            <Reveal><Card className="h-full"><h3 className="text-lg font-bold">Keep the data layer swappable</h3><p className="mt-2 text-sm leading-relaxed text-stone-600">Content lives in one typed data layer. JSON today, an API tomorrow, with no changes to any component.</p></Card></Reveal>
          </div>
          <h3 className="mt-10 text-xl font-bold">Skill domains</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.domains.map((d) => (
              <Reveal key={d.title}><Card className="h-full"><h4 className="font-bold">{d.title}</h4><p className="mt-2 text-sm leading-relaxed text-stone-600">{d.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{d.items.map((i) => (<span key={i} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs">{i}</span>))}</div></Card></Reveal>
            ))}
          </div>
        </Section>

        {/* WORK */}
        <Section id="work" eyebrow="Selected work" title="Projects that actually run">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <Card className="h-full overflow-hidden p-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.name} illustration`} className="h-52 w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">{p.type}</p>
                    <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => (<span key={s} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs">{s}</span>))}</div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 font-medium text-accent hover:underline">{p.linkLabel} <ExternalLink size={16} /></a>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* OPEN SOURCE */}
        <Section id="opensource" eyebrow="Open source" title="Work shared in the open">
          <div className="grid gap-6 md:grid-cols-3">
            {([
              ['Merged contributions', opensource.contributions, Code2],
              ['Maintained tools', opensource.tools, Briefcase],
              ['Published apps', opensource.apps, Sparkles],
            ] as const).map(([title, items, Icon]) => (
              <div key={title}>
                <h3 className="flex items-center gap-2 text-lg font-bold"><Icon size={20} className="text-accent" /> {title}</h3>
                <div className="mt-4 space-y-4">{items.map((it) => (
                  <Card key={it.name}>
                    {it.link ? <a href={it.link} target="_blank" rel="noreferrer" className="font-bold hover:text-accent hover:underline">{it.name}</a> : <p className="font-bold">{it.name}</p>}
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{it.description}</p>
                  </Card>
                ))}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="Skills" title="Detailed skill groups">
          <div className="grid gap-4 md:grid-cols-2">
            {skills.groups.map((g) => (<Reveal key={g.title}><Card><h3 className="font-bold">{g.title}</h3><div className="mt-3 flex flex-wrap gap-2">{g.items.map((i) => (<span key={i} className="rounded-full bg-accentSoft px-3 py-1.5 text-sm font-medium text-teal-900">{i}</span>))}</div></Card></Reveal>))}
          </div>
        </Section>

        {/* CAREER */}
        <Section id="career" eyebrow="Career" title="Timeline" note="The first entry is Deni's independent work. The other entries are clearly marked samples — replace them in data/career.json with real roles before presenting this as a CV.">
          <div className="space-y-4">
            {career.map((c) => (<Reveal key={c.role + c.org}><Card><div className="flex flex-wrap justify-between gap-2"><h3 className="font-bold">{c.role}</h3><span className="text-sm text-stone-500">{c.period}</span></div><p className="mt-1 font-medium text-accent">{c.org}</p><p className="mt-2 text-sm leading-relaxed text-stone-600">{c.description}</p></Card></Reveal>))}
          </div>
        </Section>

        {/* CERTIFICATIONS + EDUCATION */}
        <Section id="certifications" eyebrow="Credentials" title="Certifications, awards & education" note="Certification, award and education entries below are samples. Replace them in data/certifications.json and data/education.json with real, verifiable credentials only.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold"><Award size={20} className="text-accent" /> Certifications & awards</h3>
              {certifications.map((c) => (<Card key={c.title}><p className="font-bold">{c.title}</p><p className="mt-1 text-sm text-stone-600">{c.issuer} · {c.year}</p><p className="mt-2 text-sm text-stone-500">{c.note}</p></Card>))}
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold"><GraduationCap size={20} className="text-accent" /> Education</h3>
              {education.map((e) => (<Card key={e.school}><p className="font-bold">{e.degree}</p><p className="mt-1 text-sm text-stone-600">{e.school} · {e.period}</p><p className="mt-2 text-sm text-stone-500">{e.description}</p></Card>))}
              <Card><p className="flex items-center gap-2 font-bold"><BookOpen size={18} className="text-accent" /> How this site is built</p><p className="mt-2 text-sm leading-relaxed text-stone-600">Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Lucide icons, exported as a static site. All content comes from data/*.json through lib/data.ts.</p></Card>
            </div>
          </div>
        </Section>

        {/* TESTIMONIALS */}
        <Section id="testimonials" eyebrow="Testimonials" title="What collaborators say" note="Testimonials below are samples. Replace them in data/testimonials.json with real, attributed quotes only.">
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (<Reveal key={t.name}><Card className="h-full"><Quote className="text-accent" /><p className="mt-3 leading-relaxed text-stone-700">“{t.quote}”</p><p className="mt-4 font-bold">{t.name}</p><p className="text-sm text-stone-500">{t.role}</p></Card></Reveal>))}
          </div>
        </Section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className="border-t border-stone-200 bg-ink text-stone-200">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold text-white">Let us build something that ships.</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-stone-400">Have a web or Android project, a puzzle or a small-business site? Start with the scope, and I will tell you plainly what can be built and verified.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white hover:bg-teal-700"><Github size={18} /> {profile.githubUsername}</a>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-5 py-2.5 font-medium hover:border-white"><Mail size={18} /> {profile.email}</a>
              </div>
              <p className="mt-4 text-sm text-stone-500">Email address is a placeholder — replace it in data/profile.json with a real inbox.</p>
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800 pt-6 text-sm text-stone-500">
              <span>© {new Date().getFullYear()} {profile.name} · Jakarta, Indonesia</span>
              <span>Original content for {profile.name}. Structure inspired by a personal portfolio layout; no text, photos or achievements were copied.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
