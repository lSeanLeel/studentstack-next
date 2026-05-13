import React from "react";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f8faff] py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
        <a href="/" className="inline-flex items-center text-sm font-medium text-[#4a90d9] hover:underline mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
        </a>
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-6">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none text-[#334155]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">1. Agreement to Terms</h2>
          <p>
            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on StudentStack&apos;s website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">3. Disclaimer</h2>
          <p>
            The materials on StudentStack&apos;s website are provided on an &apos;as is&apos; basis. StudentStack makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">4. Limitations</h2>
          <p>
            In no event shall StudentStack or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on StudentStack&apos;s website.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </div>
    </div>
  );
}
