"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#3b73ed] text-white   ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl pt-6 font-medium leading-snug font-satoshi text-white">
            Unlock the Power of Your Knowledge
            <br />
            <span className="text-blue-200">Organize. Store. Access.</span>
          </h2>
          <p className="text-black/80 font-medium mt-4 font-inter max-w-xl mx-auto py-6">
            A second brain for your links, ideas, and inspiration — designed to help students and indie devs stay organized and focused.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 py-6">
  {/* Feature 1 - CTA Card */}
  <Card className="bg-white text-black p-6 flex flex-col justify-between min-h-[260px] rounded-3xl shadow-xl border border-black">
    <CardContent className="p-0">
      <div>
        <h3 className="text-xl font-bold mb-4 font-satoshi text-black">
          Start Organizing Your Links Today
        </h3>
        <p className="mb-6 text-sm font-inter text-gray-700">
          Get started with your second brain — organize, store, and access all your important resources in one place.
        </p>
      </div>
     
    </CardContent>
  </Card>

  {/* Feature 2 - Smart Organization */}
  <Card className="bg-white text-black p-6 rounded-3xl shadow-md border border-black">
    <CardContent className="p-0">
      <div className="mb-6">
        
        <h3 className="text-lg font-bold mb-2 font-satoshi text-black">
          Keep Your Links and Ideas Organized
        </h3>
        <p className="text-gray-700 font-inter">
          Easily categorize and store your links, ideas, and notes. Retrieve them instantly whenever you need them.
        </p>
      </div>
     
    </CardContent>
  </Card>

  {/* Feature 3 - Link and Store Resources */}
  <Card className="bg-white text-black p-6 rounded-3xl shadow-md border border-black">
    <CardContent className="p-0">
      <div className="mb-6">
       
        <h3 className="text-lg font-bold mb-2 font-satoshi text-black">
          Add Links, Notes, and Media for Quick Access
        </h3>
        <p className="text-gray-700 font-inter">
          Embed links, YouTube videos, articles, or code snippets to each resource for easy reference at any time.
        </p>
      </div>
    
    </CardContent>
  </Card>

  {/* Feature 4 - Share & Collaborate */}
  <Card className="bg-white text-black p-6 rounded-3xl shadow-md border border-black">
    <CardContent className="p-0">
      <div className="mb-6">
       
        <h3 className="text-lg font-bold mb-2 font-satoshi text-black">
          Collaborate with Peers and Teammates
        </h3>
        <p className="text-gray-700 font-inter">
          Share your knowledge and work together with classmates, fellow developers, or teammates effortlessly.
        </p>
      </div>
     
    </CardContent>
  </Card>
</div>

      </div>
    </section>
  );
};

export default FeaturesSection;
