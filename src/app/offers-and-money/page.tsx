"use client";
import { Post } from "@/types/post";
import {
  PortableTextRenderer,
  toCustomPortableText,
} from "../../../sanity/lib/portableTextWithSlicer";
import {
  Gift,
  Plane,
  ShoppingCart,
  Smartphone,
  Tag,
  Utensils,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import Link from "next/link";

export default function OffersPage() {
  const { data: cachedPosts } = useGlobalData<Post[]>(postsQuery);
  const bargainPosts = cachedPosts
    ?.filter((post) => post.category === "Bargain")
    .slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col">
      <title>Welcome to BudgetBuddy - Live More, Spend Less</title>
      <meta
        name="description"
        content="Discover amazing bargains and money-saving tips"
      />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center shadow-md rounded-xl">
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
                ✨ How to use this page
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Browse Articles:</strong> Discover money-saving tips
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
                    <strong>Share Wisdom:</strong> Share this with your friends
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 shadow-md rounded-xl bg-gradient-to-br from-purple-900 to-purple-800 mt-5">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Saving Categories
              </h2>
              <p className="text-lg text-white">
                Explore our comprehensive guides and tips across these
                money-saving categories
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <ShoppingCart className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">
                  Groceries
                </h3>
                <p className="text-gray-700 mb-4">
                  Strategic shopping tips, coupon guides, and store comparisons
                  to maximize your grocery budget.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Utensils className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">
                  Dining
                </h3>
                <p className="text-gray-700 mb-4">
                  Restaurant deals, happy hour specials, and strategies for
                  eating out without breaking the bank.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Plane className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">
                  Travel
                </h3>
                <p className="text-gray-700 mb-4">
                  Travel tips, DIY solutions, and booking ahead of time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-purple-50 mt-5 shadow-md rounded-xl">
          <div className="container px-4 md:px-6">
            
                <h2 className="text-3xl font-bold mb-6 text-purple-900 text-center">
                  Smart Saving Strategies
                </h2>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Beyond deals and coupons, these long-term strategies can help
                  you save money consistently.
                </p>

                <div className="space-y-6 mt-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Tag className="h-6 w-6 text-purple-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-purple-900">
                            Meal Planning
                          </h3>
                          <span className="bg-purple-100 text-purple-900 text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Planning your meals in advance can reduce food waste
                          and impulse purchases. Learn how to create effective
                          meal plans that save both time and money.
                        </p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-purple-900 hover:text-purple-700 text-sm"
                        >
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Smartphone className="h-6 w-6 text-purple-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-purple-900">
                            Tech Gadget Discounts
                          </h3>
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            Hot Deal
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Major electronics retailers are offering end-of-model
                          clearance sales with up to 40% off.
                        </p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-purple-900 hover:text-purple-700 text-sm"
                        >
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Gift className="h-6 w-6 text-purple-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-purple-900">
                            Seasonal Shopping
                          </h3>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Buying produce, clothing, and other items in season
                          can lead to significant savings. Discover the best
                          times to buy different categories of products.
                        </p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-purple-900 hover:text-purple-700 text-sm"
                        >
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-900 text-white mt-5 shadow-md rounded-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">
              🏆 Top Bargain Picks
            </h2>
            <p className="text-center text-purple-200 mb-8">
              Live in budget, get more while paying less!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bargainPosts?.map((post, index) => (
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
                    <Link
                      href={`/posts/${post._id}`}
                      className="mt-4 inline-block text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-100 mt-5 shadow-md rounded-xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Ready to Discover Amazing Bargains?
            </h2>
            <Link
              href="/post/bargain"
              className="inline-block bg-purple-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-800 transition duration-200 shadow-lg"
            >
              Browse All Posts
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
