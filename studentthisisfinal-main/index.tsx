import React from "react";
import { createRoot } from "react-dom/client";
import { ShieldCheck } from "lucide-react";
import { AppRouter } from "./src/router";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center font-sans">
          <div className="max-w-md p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
            <div className="h-20 w-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="text-red-500 h-10 w-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Something broke</h1>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Try a refresh. If you keep seeing this, open the browser console and send a screenshot to support.
            </p>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}
