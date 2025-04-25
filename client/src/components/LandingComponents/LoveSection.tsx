"use client";

import type React from "react";

const LoveSection: React.FC = () => {
  return (
    <section
      className="py-4 px-4 bg-[#3b73ed]"
      role="region"
      aria-label="Who this Second Brain is built for"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-black md:text-4xl font-bold mb-4 font-satoshi">
            Built for Every <span className="text-white">Mind</span>
          </h2>
          <p className="text-gray-800 font-medium max-w-2xl mx-auto font-inter">
            Whether you're capturing inspiration or researching deeply,
            your second brain keeps everything organized and within reach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Content Creators */}
          <article
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-black"
            aria-label="For Content Creators"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl" role="img" aria-label="Camera emoji">
                📸
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Content Creators</h3>
            <p className="text-gray-600 font-inter">
              Save tweets, inspiration, video links & quotes to fuel your next idea.
              Stay creative with your personal knowledge vault.
            </p>
          </article>

          {/* Lifelong Learners */}
          <article
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-black"
            aria-label="For Lifelong Learners"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl" role="img" aria-label="Book emoji">
                📚
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Lifelong Learners</h3>
            <p className="text-gray-600 font-inter">
              Capture URLs, YouTube videos, and article summaries so nothing
              gets lost. Build your second brain as you explore.
            </p>
          </article>

          {/* Knowledge Workers */}
          <article
            className="bg-white p-6 md:p-8 rounded-2xl  border-2 border-black shadow-md hover:shadow-lg transition-all"
            aria-label="For Knowledge Workers"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl" role="img" aria-label="Laptop emoji">
                💻
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Knowledge Workers</h3>
            <p className="text-gray-600 font-inter">
              Structure your thoughts, save research, and find ideas quickly.
              Boost productivity with a system that thinks with you.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LoveSection;
