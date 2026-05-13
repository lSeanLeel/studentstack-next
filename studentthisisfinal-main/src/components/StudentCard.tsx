import React from "react";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { Student } from "../lib/students";

export const StudentCard = React.memo(({
  student,
  onSelect,
  isSelected,
}: {
  student: Student;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  return (
    <button
      onClick={onSelect}
      className={`group relative flex flex-col rounded-xl sm:rounded-[2rem] bg-white overflow-hidden transition-all duration-500 h-full w-full text-left ${
        isSelected 
          ? 'ring-2 ring-sky-500 shadow-2xl scale-[1.02]' 
          : 'hover:shadow-2xl hover:-translate-y-2 border border-slate-100'
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
        {student.photo ? (
          <SmartImage
            studentName={student.name}
            initials={student.initials}
            defaultSrc={student.photo}
            className={`h-full w-full object-cover object-top transition-transform duration-700 ${student.name === "Daniel Zhang" ? "scale-[1.15] origin-top-left group-hover:scale-[1.25]" : "group-hover:scale-110"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xl sm:text-4xl font-black text-slate-300 font-display">
            {student.initials}
          </div>
        )}
        
        <div className="absolute top-1 left-1 sm:top-4 sm:left-4">
          <div className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="text-[6px] sm:text-[9px] font-black text-slate-900 uppercase tracking-widest">
              {student.university}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-6 flex flex-col flex-grow">
        <div className="mb-1 sm:mb-4">
          <h3 className="text-[10px] sm:text-xl font-black text-slate-900 leading-tight mb-0.5 sm:mb-1 font-display truncate">
            {student.name}
          </h3>
          <p className="text-[6px] sm:text-[10px] font-black text-sky-500 uppercase tracking-widest truncate">
            {student.major}
          </p>
        </div>
        
        <div className="mt-auto pt-1 sm:pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[6px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            &apos;{student.classYear.toString().slice(-2)}
          </span>
          <div className="h-4 w-4 sm:h-8 sm:w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
            <ArrowRight className="h-2 w-2 sm:h-4 sm:w-4" />
          </div>
        </div>
      </div>
    </button>
  );
});

StudentCard.displayName = "StudentCard";
