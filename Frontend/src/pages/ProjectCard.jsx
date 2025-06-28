import React from "react";
import { Heart, Star, Clock, Target, Play, ArrowRight, Eye, Share2, Lightbulb, Code } from "lucide-react";

export default function ProjectCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 bg-cyan-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 left-[20%] top-[20%]"></div>
        <div className="absolute w-1 h-1 bg-cyan-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 left-[50%] top-[40%]"></div>
        <div className="absolute w-1 h-1 bg-cyan-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 left-[80%] top-[60%]"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 border border-slate-600/30 text-blue-400">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 border-orange-500/30 border text-orange-300">
                  ⚡ Intermediate
                </span>
              </div>
              <p className="text-slate-400 text-sm">Full Stack</p>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 rounded-xl border transition-all duration-200 bg-slate-800/50 border-slate-600/30 text-slate-400 hover:text-red-400">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border transition-all duration-200 bg-slate-800/50 border-slate-600/30 text-slate-400 hover:text-yellow-400">
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
            AI-Powered Interactive Dashboard
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            Build a stunning real-time dashboard with machine learning insights, data visualization, and responsive design that adapts to any device.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {['React', 'D3.js', 'Machine Learning', 'WebSocket'].map((tag) => (
              <span key={tag} className="px-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-200 rounded-xl text-sm font-medium backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/40 transition-all cursor-default hover:scale-105">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Duration</p>
              <p className="text-white font-semibold">2-3 weeks</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Level</p>
              <p className="text-white font-semibold">Intermediate</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            <span>Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-4 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </button>
          <button className="px-4 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" /> Quick Preview
          </h4>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• React, D3.js implementation</p>
            <p>• Step-by-step tutorials included</p>
            <p>• Source code and templates provided</p>
            <p>• Community support available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
