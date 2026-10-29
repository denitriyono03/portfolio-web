// Data layer — the ONLY place that knows where content comes from.
//
// HOW IT WORKS TODAY (JSON):
//   Every getter below returns typed data read from a file in data/*.json.
//   Components must call these getters and must never import a JSON file
//   directly, so the source can change without touching any component.
//
// HOW TO SWAP TO AN API LATER (no component changes):
//   1. Implement the same `DataSource` interface with `fetch()` calls, e.g.:
//        const apiSource: DataSource = {
//          getProfile: () => fetchJson('/api/profile'),
//          getProjects: () => fetchJson('/api/projects'),
//          // ... one method per getter, same return types
//        };
//   2. Change the single export at the bottom of this file:
//        export const dataSource: DataSource = apiSource;   // was: jsonSource
//      (or gate it on an env flag, e.g.
//        process.env.NEXT_PUBLIC_DATA_SOURCE === 'api' ? apiSource : jsonSource)
//   3. Keep the return types identical. If an API field name differs, map it
//      inside the API implementation, not in components.
//   That is the whole migration: one interface, one line, zero component edits.

import profileJson from '../data/profile.json';
import projectsJson from '../data/projects.json';
import skillsJson from '../data/skills.json';
import careerJson from '../data/career.json';
import opensourceJson from '../data/opensource.json';
import testimonialsJson from '../data/testimonials.json';
import highlightsJson from '../data/highlights.json';
import educationJson from '../data/education.json';
import certificationsJson from '../data/certifications.json';

export interface Stat { label: string; value: string }
export interface Profile {
  name: string; role: string; tagline: string; bio: string;
  location: string; github: string; githubUsername: string;
  email: string; availability: string; stats: Stat[]; trusted: string[];
}
export interface Highlight { title: string; description: string; tag: string }
export interface Project {
  id: string; name: string; type: string; description: string;
  stack: string[]; image: string; link: string; linkLabel: string;
}
export interface SkillDomain { title: string; description: string; items: string[] }
export interface SkillGroup { title: string; items: string[] }
export interface SkillsData { domains: SkillDomain[]; groups: SkillGroup[] }
export interface CareerEntry { role: string; org: string; period: string; description: string }
export interface OpenSourceLink { name: string; description: string; link?: string }
export interface OpenSourceData {
  contributions: OpenSourceLink[]; tools: OpenSourceLink[]; apps: OpenSourceLink[];
}
export interface Testimonial { name: string; role: string; quote: string }
export interface EducationEntry { school: string; degree: string; period: string; description: string }
export interface Certification { title: string; issuer: string; year: string; note: string }

export interface DataSource {
  getProfile(): Promise<Profile>;
  getHighlights(): Promise<Highlight[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<SkillsData>;
  getCareer(): Promise<CareerEntry[]>;
  getOpenSource(): Promise<OpenSourceData>;
  getTestimonials(): Promise<Testimonial[]>;
  getEducation(): Promise<EducationEntry[]>;
  getCertifications(): Promise<Certification[]>;
}

// Current implementation: local JSON files.
const jsonSource: DataSource = {
  getProfile: async () => profileJson as Profile,
  getHighlights: async () => highlightsJson as Highlight[],
  getProjects: async () => projectsJson as Project[],
  getSkills: async () => skillsJson as SkillsData,
  getCareer: async () => careerJson as CareerEntry[],
  getOpenSource: async () => opensourceJson as OpenSourceData,
  getTestimonials: async () => testimonialsJson as Testimonial[],
  getEducation: async () => educationJson as EducationEntry[],
  getCertifications: async () => certificationsJson as Certification[],
};

// Swap this one line to change the data source (see header comment).
export const dataSource: DataSource = jsonSource;

export const getProfile = () => dataSource.getProfile();
export const getProjects = () => dataSource.getProjects();
export const getSkills = () => dataSource.getSkills();
export const getCareer = () => dataSource.getCareer();
export const getOpenSource = () => dataSource.getOpenSource();
export const getTestimonials = () => dataSource.getTestimonials();
export const getHighlights = () => dataSource.getHighlights();
export const getEducation = () => dataSource.getEducation();
export const getCertifications = () => dataSource.getCertifications();
