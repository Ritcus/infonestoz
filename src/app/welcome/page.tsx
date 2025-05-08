"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Post } from "@/types/post";
import {
  PortableTextRenderer,
  toCustomPortableText,
} from "../../../sanity/lib/portableTextWithSlicer";

export default function WelcomePage() {
  const [showPWAInstallPrompt, setShowPWAInstallPrompt] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);

  // Show PWA prompt after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if mobile device
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        setShowPWAInstallPrompt(true);
        console.log(showPWAInstallPrompt); //delete
      setPosts(posts) //delete
      }
      
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your API
    console.log("Form submitted:", formData);
    alert("Thanks for sharing your experience!");
    setFormData({ name: "", email: "", experience: "" });
  };

  return (
    <>
      <Head>
        <title>Welcome to BudgetBuddy - Live More, Spend Less</title>
        <meta
          name="description"
          content="Discover amazing bargains and money-saving tips"
        />
      </Head>
      {/* Main Welcome Page */}
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-purple-100 rounded-full p-3 mb-6">
              <span className="text-4xl">😊</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6">
              Welcome to <span className="text-purple-600">BudgetBuddy</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Your ultimate guide to{" "}
              <span className="font-bold text-purple-700">
                living well while spending less!
              </span>
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-12 text-left">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                ✨ How to use this site
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Browse Posts:</strong> Discover money-saving tips
                    and bargain finds
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Save Deals:</strong> Bookmark your favorite bargains
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Share Wisdom:</strong> Tell us your budget hacks
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Top Bargain Posts */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">
              🏆 Top 5 Bargain Picks
            </h2>
            <p className="text-center text-purple-200 mb-8">
              Live in budget, get more while paying less!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post, index) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg text-purple-900"
                >
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <span className="bg-purple-100 text-purple-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                    </div>
                    {post.content && (
                      <div className="text-gray-600 mb-4">
                        <PortableTextRenderer
                          content={toCustomPortableText(post.content)}
                          wordLimit={30}
                          removeImages={true}
                        />
                      </div>
                    )}
                    <a
                      href={`/posts/${post.slug.current}`}
                      className="mt-4 inline-block text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share Experience Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block bg-purple-100 rounded-full p-3 mb-6">
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Share Your Budget Wins!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Help others save by sharing your best bargain finds and
              money-saving tips
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-6 text-left"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="experience"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Experience/Tip
                </label>
                <textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
              >
                Share Your Wisdom
              </button>
            </form>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Ready to Discover Amazing Bargains?
            </h2>
            <a
              href="/posts"
              className="inline-block bg-purple-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-800 transition duration-200 shadow-lg"
            >
              Browse All Posts
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
