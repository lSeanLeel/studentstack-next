import React, { useState, useEffect } from "react";

export const SmartImage = ({ 
  studentName, 
  initials, 
  defaultSrc, 
  className 
}: { 
  studentName: string, 
  initials: string, 
  defaultSrc?: string, 
  className: string 
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [error, setError] = useState(false);
  const [candidates, setCandidates] = useState<string[]>([]);

  useEffect(() => {
    if (defaultSrc && (defaultSrc.startsWith('http') || defaultSrc.startsWith('data:'))) {
      setCandidates([defaultSrc]);
      setSrcIndex(0);
      setError(false);
      return;
    }

    const slug = studentName.toLowerCase().replace(/\s+/g, '-');
    const firstName = studentName.split(' ')[0].toLowerCase();
    
    const baseNames = Array.from(new Set([defaultSrc, slug, firstName].filter(Boolean) as string[]));
    const extensions = ['.jpg', '.png', '.webp'];
    const paths: string[] = [];

    baseNames.forEach(base => {
      const rawBase = base.startsWith('/') ? base.slice(1) : base;
      if (rawBase.includes('.')) {
        paths.push(`/${rawBase}`);
      } else {
        extensions.forEach(ext => {
          paths.push(`/${rawBase}${ext}`);
        });
      }
    });

    setCandidates(Array.from(new Set(paths)));
    setSrcIndex(0);
    setError(false);
  }, [studentName, defaultSrc]);

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setError(true);
    }
  };

  if (error || candidates.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-sky-50 text-sky-600 font-bold ${className} text-xl sm:text-2xl`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={candidates[srcIndex]}
      alt={studentName}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};
