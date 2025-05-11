import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Globe, Shield, Award, BookOpen, Coffee, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-purple-900 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/our-story.jpg?height=800&width=1600&text=Blog+Background"
              alt="Background pattern"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Delivering independent, thoughtful insights on the topics that matter most.
              </p>
              <div className="flex justify-center gap-2">
                <div className="h-1 w-16 bg-purple-500 rounded-full"></div>
                <div className="h-1 w-4 bg-purple-300 rounded-full"></div>
                <div className="h-1 w-2 bg-purple-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 shadow-md rounded-xl self-center">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Founded in 2024, InfoNest delivers thoughtful, unbiased perspectives on technology, design,
                  productivity, and business.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Free from corporate influence, we explore topics with depth and nuance, always putting our readers&apos;
                  interests first.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Globe className="h-6 w-6 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Independent</h3>
                      <p className="text-sm text-gray-600">Free from corporate influence</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Neutral</h3>
                      <p className="text-sm text-gray-600">Balanced and fair perspectives</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/our-mission.jpeg?height=800&width=600&text=Our+Mission"
                    alt="Our mission"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-purple-200 rounded-lg -z-10"></div>
                <div className="absolute -top-6 -right-6 h-24 w-24 bg-purple-100 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <p className="text-lg ">
                These core principles guide everything we do, from the topics we cover to how we interact with our
                community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">Quality Over Quantity</h3>
                <p className="text-gray-700">
                  We prioritize thoughtful, well-researched content over clickbait. Every article is crafted to provide
                  genuine value to our readers.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">Editorial Integrity</h3>
                <p className="text-gray-700">
                  We maintain strict editorial independence. Our opinions are our own, and we&apos;re transparent about our
                  processes and relationships.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">Inclusive Perspective</h3>
                <p className="text-gray-700">
                  We strive to represent diverse viewpoints and experiences, recognizing that the best insights come
                  from a variety of perspectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 md:py-24 shadow-md rounded-xl self-center">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/our-thoughts.jpeg?height=800&width=600&text=Our+Approach"
                    alt="Our approach to content"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Thoughtful Analysis</h3>
                      <p className="text-sm text-purple-100">We dive deep into topics that matter</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-purple-200 rounded-lg -z-10"></div>
                <div className="absolute -top-6 -left-6 h-32 w-32 bg-purple-100 rounded-lg -z-10"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Approach</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-purple-100 p-3 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Research Thoroughly</h3>
                      <p className="text-gray-700">
                        We gather diverse perspectives and verify facts before forming opinions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-purple-100 p-3 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                      <Coffee className="h-5 w-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Write Clearly</h3>
                      <p className="text-gray-700">
                        Complex ideas deserve clear explanations. We make the complicated accessible.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-purple-100 p-3 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Engage Meaningfully</h3>
                      <p className="text-gray-700">
                        We foster conversations that matter and build a community around shared curiosity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Philosophy</h2>
              <p className="text-xl mb-10 leading-relaxed">
                We believe that great content should inform, inspire, and empower. In a world of information overload,
                we strive to be a trusted voice that cuts through the noise with clarity and purpose.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                  <p className="italic text-purple-100">
                  &quot;We don&apos;t chase trends—we explore ideas that stand the test of time.&quot;
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                  <p className="italic text-purple-100">
                  &quot;Our success is measured by the value we provide, not the clicks we generate.&quot;
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                  <p className="italic text-purple-100">
                  &quot;We believe in the power of words to change perspectives and inspire action.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 md:py-24 bg-purple-50 shadow-md rounded-xl self-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-6">
                <MessageCircle className="h-8 w-8 text-purple-900" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-900">Let&apos;s Connect</h2>
              <p className="text-xl text-gray-700 mb-8">
              If you&apos;d like to be considered for our business directory or have your company featured for review, please feel free to contact us.
              </p>
              <Button asChild size="lg" className="bg-purple-900 hover:bg-purple-800 text-white">
                <Link href="/contact" className="flex items-center">
                  Send us a message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
