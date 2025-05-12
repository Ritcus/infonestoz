import { useState } from "react";
import { Input } from "./ui/input";

export default function NewsLetterSection () {

    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <section className="bg-purple-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            {isSubmitted ? (
            <div>
            <p className="text-muted-foreground mb-6">
              Join our newsletter and never miss out on new content.
              We&apos;ll deliver the best articles straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <form 
                onSubmit={()=>setIsSubmitted(true)}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <button className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-medium mt-5">
                Subscribe
              </button>
              </form>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            </div>
            ): (<div className="font-bold text-purple-900">
                Thanks for subscribing! We’ll drop the good stuff in your inbox soon. 
            </div>)}
            </div>
        </div>
      </section>
    )
}