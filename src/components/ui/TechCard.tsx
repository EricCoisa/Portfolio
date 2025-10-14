import React from 'react';
import { Code, FileCode, Zap, Cpu, Server, Database, Box, GitBranch, Dock, Archive } from 'lucide-react';

interface TechCardProps {
  tech: string;
  size?: 'sm' | 'md' | 'lg';
}

type TechMeta = {
  colorClass: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const colorMap: Record<string, TechMeta> = {
  React: { colorClass: 'bg-[#61DAFB] text-black', Icon: Code },
  TypeScript: { colorClass: 'bg-[#3178C6] text-white', Icon: FileCode },
  JavaScript: { colorClass: 'bg-[#F7DF1E] text-black', Icon: Zap },
  'C#': { colorClass: 'bg-[#68217A] text-white', Icon: Cpu },
  Docker: { colorClass: 'bg-[#2496ED] text-white', Icon: Dock },
  Redux: { colorClass: 'bg-[#764ABC] text-white', Icon: GitBranch },
  Vite: { colorClass: 'bg-[#646CFF] text-white', Icon: Archive },
  Node: { colorClass: 'bg-[#339933] text-white', Icon: Server },
  Nodejs: { colorClass: 'bg-[#339933] text-white', Icon: Server },
  'ASP.NET': { colorClass: 'bg-[#512BD4] text-white', Icon: Server },
  'Entity Framework': { colorClass: 'bg-[#0EA5A4] text-white', Icon: Database },
  IIS: { colorClass: 'bg-[#0F172A] text-white', Icon: Server },
  Default: { colorClass: 'bg-slate-200 text-slate-800' },
};

const sizeMap: Record<string, string> = {
  sm: 'w-12 h-12 text-sm',
  md: 'w-16 h-16 text-base',
  lg: 'w-20 h-20 text-lg',
};

export const TechCard: React.FC<TechCardProps> = ({ tech, size = 'md' }) => {
  const clean = tech.replace(/\/.+$/, '').replace(/\s+/g, ' ').trim();
  const foundKey = Object.keys(colorMap).find((k) => clean.toLowerCase().includes(k.toLowerCase()));
  const meta = (foundKey && colorMap[foundKey]) || colorMap.Default;
  const { colorClass, Icon } = meta;
  const sz = sizeMap[size];

  const initials = clean
    .split(/[^A-Za-z0-9]+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`flex flex-col items-center justify-center ${sz}`}>
      <div className={`flex items-center justify-center rounded-lg shadow-md ${colorClass} ${sz} shrink-0`} aria-hidden>
        {Icon ? <Icon className="h-6 w-6" /> : <span className="font-bold select-none">{initials}</span>}
      </div>
      <div className="mt-2 text-xs text-center w-20 truncate text-slate-700 dark:text-slate-200">{clean}</div>
    </div>
  );
};

export default TechCard;
