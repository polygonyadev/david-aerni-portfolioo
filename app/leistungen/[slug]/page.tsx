import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceDetails } from "../../../lib/service-details";

export function generateStaticParams() { return Object.keys(serviceDetails).map((slug) => ({ slug })); }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails[slug as keyof typeof serviceDetails];
  if (!service) notFound();
  return <main className="detail-page"><header className="detail-nav"><Link className="brand" href="/">DA<span>—</span></Link><Link href="/#work">← Zur Übersicht</Link></header><section className="detail-hero"><p className="eyebrow">{service.number} / Leistung</p><h1>{service.title}</h1><div className="detail-object" aria-hidden="true"><span /><i /></div><p className="detail-intro">{service.intro}</p></section><section className="detail-body"><p className="eyebrow">Im Detail</p><div><h2>{service.text}</h2><ul>{service.points.map((point, index) => <li key={point}><span>0{index + 1}</span>{point}</li>)}</ul><Link className="detail-contact" href="/#contact">Projekt anfragen <span>↗</span></Link></div></section></main>;
}
