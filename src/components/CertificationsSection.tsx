"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, FileCheck2, GraduationCap } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { MEMBER_CERT_MODULES } from "@/lib/portal/certifications";

/**
 * Organization-issued AI certifications — lead with college application attach value.
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-slate-900 bg-[#0b1220] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="certs-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_90%,rgba(255,106,0,0.14),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff9a4d] ${jakartaSans.className}`}>
            Organization-issued credentials
          </p>
          <h2
            id="certs-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Badges students attach to{" "}
            <span className="text-sky-300">college applications</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
          >
            StudentStack issues digital AI credentials for members. Students list them on Common App activities,
            counselor notes, and portfolios as proof of responsible, school-ready AI use.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6 sm:mt-12">
          {MEMBER_CERT_MODULES.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="border-b border-white/10 bg-gradient-to-r from-sky-500/20 to-transparent px-6 py-5 sm:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-sky-700 shadow-lg">
                    {index === 0 ? (
                      <FileCheck2 className="h-6 w-6" aria-hidden />
                    ) : (
                      <GraduationCap className="h-6 w-6" aria-hidden />
                    )}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-200 ${jakartaSans.className}`}>
                      {cert.code} · {cert.priceLabel}
                    </p>
                    <h3 className={`text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl ${fredokaHeadline.className}`}>
                      {cert.title}
                    </h3>
                  </div>
                </div>
                <p className={`mt-4 flex gap-2 text-sm font-semibold leading-snug text-emerald-200/95 ${jakartaSans.className}`}>
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {cert.collegeHook}
                </p>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
                  <p className={`text-base font-semibold text-sky-200/90 ${jakartaSans.className}`}>{cert.tagline}</p>
                  <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
                    {cert.overview}
                  </p>
                  <ol className="mt-6 space-y-3">
                    {cert.modules.map((mod, i) => (
                      <li key={mod.title} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                          Module {i + 1} · {mod.minutes} min
                        </p>
                        <p className={`mt-1 font-semibold text-white ${fredokaHeadline.className}`}>{mod.title}</p>
                        <p className={`mt-1 text-xs font-medium text-slate-400 ${jakartaSans.className}`}>{mod.outcome}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-black/25 p-6 sm:p-8">
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-[#ff9a4d] ${jakartaSans.className}`}>
                    Where students attach it
                  </p>
                  <ul className={`mt-4 space-y-3 text-sm font-semibold text-slate-200 ${jakartaSans.className}`}>
                    {cert.badgeUse.map((use) => (
                      <li key={use} className="flex gap-2">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                        {use}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/join"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-sky-100 ${jakartaSans.className}`}
                  >
                    Join membership
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
