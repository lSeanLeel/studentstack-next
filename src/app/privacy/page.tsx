import React from "react";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f8faff] py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
        <a href="/" className="inline-flex items-center text-sm font-medium text-[#4a90d9] hover:underline mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
        </a>
        <h1 className="text-3xl font-extrabold text-[#1a1a2e] mb-6">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none text-[#334155]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">1. Introduction</h2>
          <p>
            Welcome to StudentStack. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Identity Data:</strong> includes first name, last name, grade level.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>To manage your registration as a new subscriber.</li>
            <li>To send you our weekly newsletter containing educational content.</li>
            <li>To improve our website and services.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-[#1a1a2e]">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: hello@studentstack.org.
          </p>
        </div>
      </div>
    </div>
  );
}
