import { createImageUrlBuilder } from "@sanity/image-url";
import { client, isSanityConfigured } from "./client";

type Image = { asset?: unknown; alt?: string };
export type SiteContent = { settings: { intro: string; aboutTitle: string; aboutEmphasis: string; aboutText: string; email: string }; projects: { title: string; category: string; image?: Image }[]; gallery: { caption?: string; image?: Image }[]; resume: { year: string; title: string; organisation: string }[]; services: { title: string; description: string }[] };

const fallback: SiteContent = {
  settings: { intro: "Ich entwickle präzise Konstruktionen und Visualisierungen, die komplexe Ideen sichtbar machen.", aboutTitle: "Vom ersten Gedanken", aboutEmphasis: "bis zum klaren Bild.", aboutText: "David Aerni verbindet technisches Verständnis mit einem ausgeprägten Blick für Form, Material und Atmosphäre. Für Produkte, Räume und Ideen mit Anspruch.", email: "hello@davidaerni.ch" },
  resume: [{ year: "Heute", title: "Freelance Konstruktion & Visualisierung", organisation: "David Aerni" }, { year: "—", title: "Deine Station ergänzen", organisation: "Wird später in Sanity gepflegt" }],
  projects: [{ title: "Dein erstes Projekt", category: "Konstruktion" }, { title: "Deine Visualisierung", category: "Visualisierung" }, { title: "Dein Modell", category: "3D-Modellierung" }],
  gallery: [{ caption: "Galeriebild 01" }, { caption: "Galeriebild 02" }, { caption: "Galeriebild 03" }, { caption: "Galeriebild 04" }, { caption: "Galeriebild 05" }],
  services: [{ title: "Konstruktion", description: "Durchdachte Lösungen, CAD-Konstruktion und technische Ausarbeitung." }, { title: "3D-Modellierung", description: "Präzise digitale Modelle als Grundlage für Entwicklung und Kommunikation." }, { title: "Visualisierung", description: "Renderings und Bilder, die Produkte und Räume spürbar machen." }],
};

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSanityConfigured) return fallback;
  try {
    const [settings, projects, gallery, resume, services] = await Promise.all([
      client.fetch(`*[_type == "siteSettings"][0]{intro, aboutTitle, aboutEmphasis, aboutText, email}`),
      client.fetch(`*[_type == "project"] | order(orderRank asc){title, category, image{asset, alt}}`),
      client.fetch(`*[_type == "galleryImage"] | order(orderRank asc){caption, image{asset, alt}}`),
      client.fetch(`*[_type == "resumeEntry"] | order(orderRank asc){year, title, organisation}`),
      client.fetch(`*[_type == "service"] | order(orderRank asc){title, description}`),
    ]);
    return { settings: { ...fallback.settings, ...settings }, projects: projects?.length ? projects : fallback.projects, gallery: gallery?.length ? gallery : fallback.gallery, resume: resume?.length ? resume : fallback.resume, services: services?.length ? services : fallback.services };
  } catch { return fallback; }
}

const builder = createImageUrlBuilder(client);
export function imageUrl(source: Image, width: number) { return builder.image(source).width(width).auto("format").url(); }
