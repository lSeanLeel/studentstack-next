import React from 'react';
import { Search, Send, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export const ResearchAcceleratorDiagram = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-12 px-6 overflow-hidden bg-slate-950/40 rounded-[2.5rem] border border-white/5 shadow-2xl group/diagram">
      {/* Background Blueprint Grid - Subtler */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative w-full max-w-md space-y-8">
        {[
          { icon: Search, label: "Identify", desc: "We find the perfect lab match for your interests.", color: "sky" },
          { icon: Send, label: "Proposal", desc: "We craft unique research proposals professors actually answer.", color: "purple" },
          { icon: GraduationCap, label: "Success", desc: "Secure your spot and excel in top-tier research.", color: "sky" }
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative flex items-center gap-6 group"
          >
            {/* Connector Line */}
            {i < 2 && (
              <div className="absolute left-8 top-16 w-[2px] h-8 bg-gradient-to-b from-sky-500/20 to-transparent" />
            )}
            
            <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl transition-all duration-500 group-hover:border-${step.color}-500/50 group-hover:shadow-${step.color}-500/10`}>
              <step.icon className="h-7 w-7 relative z-10" />
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-black text-white">
                0{i + 1}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white group-hover:text-sky-400 transition-colors">{step.label}</span>
              <span className="text-xs font-medium text-slate-400 mt-1 leading-relaxed">{step.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simplified Stats */}
      <div className="mt-12 flex items-center justify-center gap-8 w-full border-t border-white/5 pt-8">
        {[
          { label: "Success", val: "94%" },
          { label: "Speed", val: "48h" },
          { label: "Labs", val: "50+" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="text-sm font-black text-white">{stat.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

