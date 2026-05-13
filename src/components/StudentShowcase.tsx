"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { students, Student } from "../lib/students";
import { StudentCard } from "./StudentCard";
import { SmartImage } from "./SmartImage";

export function StudentShowcase() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <section id="mentors" className="overflow-hidden bg-slate-50 py-16 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-16 sm:gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className={`text-[11px] font-medium leading-snug tracking-wide text-slate-500 sm:text-xs ${jakartaSans.className}`}>
              The <span className="font-bold text-sky-600">Student</span>s behind StudentStack
            </p>
            <h2
              className={`mt-2 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-slate-900 sm:text-6xl lg:text-7xl ${fredokaHeadline.className}`}
            >
              Meet the <span className="text-sky-500">team</span>
            </h2>
          </div>
          <p className={`max-w-md text-base font-medium leading-relaxed text-slate-500 sm:text-lg ${jakartaSans.className}`}>
            Sharing how we use AI for everyday organization, school, research + more!
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8">
          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <StudentCard
                student={student}
                onSelect={() => setSelectedStudent(student)}
                isSelected={selectedStudent?.id === student.id}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStudent && (
          <StudentDetailModal
            student={selectedStudent}
            onDeselect={() => setSelectedStudent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function StudentDetailModal({ student, onDeselect }: { student: Student | null; onDeselect: () => void }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4" onClick={onDeselect}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg" 
      />
      <motion.div 
        layoutId={`student-card-${student.id}`}
        className="relative w-full max-w-5xl h-[85vh] max-h-[700px] rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-2/5 h-1/2 md:h-full relative overflow-hidden bg-slate-100">
          <SmartImage 
            studentName={student.name} 
            initials={student.initials}
            defaultSrc={student.photo}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ${student.name === "Daniel Zhang" ? "scale-[1.15] origin-top-left hover:scale-[1.25]" : "object-[center_15%] scale-[1.05] hover:scale-110"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="w-full md:w-3/5 h-1/2 md:h-full p-8 sm:p-16 overflow-y-auto custom-scrollbar bg-slate-900">
          <button 
            onClick={onDeselect}
            className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-8 border border-sky-500/20">
              {student.university} &apos;{student.classYear}
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-4 font-display leading-tight">{student.name}</h2>
            <p className="text-lg text-sky-400 font-bold uppercase tracking-[0.3em] mb-10">{student.major}</p>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-6">About</h4>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">{student.bio}</p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-6">Key Accomplishments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {student.accomplishments.map((acc, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all">
                      <CheckCircle2 className="h-5 w-5 text-sky-500 mt-0.5" />
                      <span className="text-sm text-slate-300 font-medium leading-snug">{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
