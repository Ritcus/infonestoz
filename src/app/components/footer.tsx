import Link from "next/link";
import {
  FaBookOpen,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="p-10 w-full border-t bg-purple-900 text-white">
      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaBookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">InfoNestOz</span>
            </div>
            <p className="text-sm text-purple-200">
              Sharing knowledge, insights, and stories that inspire and inform.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-purple-200 hover:text-white">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white">
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Business
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-purple-200 hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-purple-200 hover:text-white"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-10 items-center">
          <p className="text-xs text-purple-200">
            © {new Date().getFullYear()} RM Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
