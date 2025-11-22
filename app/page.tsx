"use client";

import { useState, useEffect } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Focus Mode",
    description: "Concentrate on what matters with our distraction-free timer",
    icon: "⏱️",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    title: "Track Progress",
    description: "Monitor your productivity with detailed analytics",
    icon: "📊",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 3,
    title: "Smart Breaks",
    description: "Take breaks at optimal intervals to maintain focus",
    icon: "☕",
    color: "from-green-500 to-green-700",
  },
  {
    id: 4,
    title: "Intentions",
    description: "Set daily intentions and track your achievements",
    icon: "🎯",
    color: "from-orange-500 to-orange-700",
  },
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <h1 className="text-2xl font-bold text-white">Anchor App</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Timer
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-6xl animate-bounce">⚓</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
            Stay Anchored
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            A beautiful productivity app built with Next.js 16 and Tailwind CSS v4.
            Focus on what matters, track your progress, and achieve your goals.
          </p>
          
          {/* Timer Demo */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-white/60 text-sm mb-4">Demo Timer</div>
              <div className="text-6xl font-mono font-bold text-white mb-6">
                {formatTime(timer)}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                >
                  {isRunning ? "⏸️ Pause" : "▶️ Start"}
                </button>
                <button
                  onClick={() => {
                    setTimer(0);
                    setIsRunning(false);
                  }}
                  className="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 bg-white/10 text-white border border-white/20 hover:bg-white/20"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl ${
                  selectedFeature === feature.id ? "ring-4 ring-purple-400 scale-105" : ""
                }`}
              >
                <div className={`text-5xl mb-4 transform transition-transform ${
                  selectedFeature === feature.id ? "scale-125 rotate-12" : ""
                }`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
                {selectedFeature === feature.id && (
                  <div className={`mt-4 h-1 bg-linear-to-r ${feature.color} rounded-full animate-pulse`} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Focus Sessions", value: "127", icon: "🎯" },
              { label: "Hours Focused", value: "342", icon: "⏰" },
              { label: "Tasks Completed", value: "89", icon: "✅" },
              { label: "Streak Days", value: "12", icon: "🔥" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Cards */}
        <section>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Daily Intentions
          </h3>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { task: "Complete project proposal", completed: true },
              { task: "Review team feedback", completed: true },
              { task: "Schedule team meeting", completed: false },
              { task: "Update documentation", completed: false },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 flex items-center gap-4 transition-all ${
                  item.completed
                    ? "opacity-60 line-through"
                    : "hover:bg-white/15 hover:scale-[1.02]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer ${
                    item.completed
                      ? "bg-green-500 border-green-500"
                      : "border-white/40 hover:border-white/60"
                  }`}
                >
                  {item.completed && <span className="text-white text-sm">✓</span>}
                </div>
                <span className="text-white flex-1">{item.task}</span>
                <span className="text-white/40 text-sm">
                  {item.completed ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white/60">
            <p>Built with Next.js 16 & Tailwind CSS v4</p>
            <p className="text-sm mt-2">Anchor App - Stay focused, achieve more</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
