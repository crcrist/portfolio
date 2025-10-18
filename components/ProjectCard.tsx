type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
};

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <div className="bg-emerald-800/20 border border-emerald-700 rounded-xl p-6 shadow-lg hover:shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-1">
      <h3 className="text-xl font-semibold text-emerald-100 mb-2">{title}</h3>
      <p className="text-emerald-200 mb-4">{description}</p>
      <a href={link} className="text-emerald-300 font-semibold hover:text-emerald-100">
        View Project →
      </a>
    </div>
  );
}
