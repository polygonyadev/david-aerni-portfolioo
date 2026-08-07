import { getSiteContent, imageUrl } from "../sanity/lib/content";

// Published Sanity content is refreshed automatically on Vercel.
export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top">DA<span>—</span></a>
        <nav><a href="#work">Projekte</a><a href="#about">Über mich</a><a href="#contact">Kontakt</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow hero-label">Freelance · Schweiz / weltweit</p>
        <h1>Technik,<br /><em>die wirkt.</em></h1>
        <div className="technical-object" aria-hidden="true"><div className="object-frame" /><div className="object-core" /><i /><b /><span /></div>
        <div className="hero-bottom"><p>{content.settings.intro}</p><a className="round-link" href="#work">Scroll to explore <b>↓</b></a></div>
      </section>

      <section className="intro section" id="about">
        <p className="eyebrow">01 / Über mich</p>
        <div><h2>{content.settings.aboutTitle}<br /><em>{content.settings.aboutEmphasis}</em></h2><p className="body-copy">{content.settings.aboutText}</p></div>
      </section>

      <section className="resume section">
        <details className="resume-accordion">
          <summary><p className="eyebrow">02 / Lebenslauf</p><span className="accordion-icon" aria-hidden="true" /></summary>
          <div className="resume-list">{content.resume.map((item) => <article key={`${item.year}-${item.title}`}><span>{item.year}</span><h3>{item.title}</h3><p>{item.organisation}</p></article>)}</div>
        </details>
      </section>

      <section className="work section" id="work">
        <p className="eyebrow">03 / Ausgewählte Arbeiten</p>
        <div className="projects">{content.projects.map((project, index) => (
          <article className={`project project-${index % 3}`} key={project.title}>
            <div className="project-art">{project.image ? <img src={imageUrl(project.image, 1600)} alt={project.image.alt || project.title} /> : <div className="shape" />}</div>
            <div className="project-info"><span>{String(index + 1).padStart(2, "0")} — {project.category}</span><h3>{project.title}</h3><a href="#contact" aria-label={`${project.title} anfragen`}>↗</a></div>
          </article>))}</div>
      </section>

      <section className="gallery section">
        <p className="eyebrow">04 / Galerie</p>
        <div className="gallery-grid">{content.gallery.map((entry, index) => <figure className={`gallery-${index % 5}`} key={`${entry.caption}-${index}`}>{entry.image ? <img src={imageUrl(entry.image, 1200)} alt={entry.image.alt || entry.caption || "Galeriebild"} /> : <div className="gallery-placeholder" />}<figcaption>{entry.caption}</figcaption></figure>)}</div>
      </section>

      <section className="services section" id="services"><p className="eyebrow">05 / Leistungen</p><div className="service-list">{content.services.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div></section>

      <section className="contact" id="contact"><p className="eyebrow">06 / Kontakt</p><h2>Eine Idee<br />verdient <em>Form.</em></h2><a className="email" href={`mailto:${content.settings.email}`}>{content.settings.email} <span>↗</span></a><p className="contact-note">Schreib mir kurz, woran du arbeitest.</p></section>
      <footer><span>© {new Date().getFullYear()} David Aerni</span><span>Konstruktion & Visualisierung</span><a href="#top">Nach oben ↑</a></footer>
    </main>
  );
}
