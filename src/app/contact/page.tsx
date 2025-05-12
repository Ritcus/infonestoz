"use client";
import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    question: "",
    subject: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("Using email:", process.env.NEXT_PUBLIC_EMAIL_USER);
  console.log("Password length:", process.env.EMAIL_PASSWORD?.length);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send email to your Gmail
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "adonism99999@gmail.com",
          subject: `New Contact from ${formData.firstName} ${formData.lastName}`,
          text: formData.question,
          replyTo: formData.email,
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg mb-6">
          <FiMail className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            We&apos;ve Got Your Message!
          </h2>
          <p>Thank you for contacting us. We&apos;ll get back to you soon.</p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full px-4 md:px-6 py-8 md:py-12 bg-white text-gray-900 shadow-md rounded-xl self-center mx-4 md:mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">HAVE SOME QUESTIONS?</h1>
        <div className="h-1 w-24 bg-purple-600 mx-auto mb-6"></div>
        <p className="text-lg font-medium mb-2">Sydney</p>
        <p className="text-gray-600">
          AUS : Standa 31 August 1989 78, Sydney, MD-2012
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 p-4 text-white flex items-center">
          <FiMail className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">Send us a message</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="Jimmy"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              What&apos;s your email?
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jimmy.smith@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="question"
              name="question"
              placeholder="Tell us about your inquiry..."
              rows={4}
              value={formData.question}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500"></div>
            <button
              type="submit"
              className="flex items-center bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              <FiSend className="mr-2" />
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
