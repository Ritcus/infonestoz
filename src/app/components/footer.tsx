import Link from "next/link";
import {
  FaBookOpen,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
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
              <Link
                href="https://www.facebook.com/profile.php?id=61576300254848#"
                className="text-purple-200 hover:text-white"
              >
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@infonest_official"
                className="text-purple-200 hover:text-white"
              >
                <FaTiktok className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                href="https://www.instagram.com/infonest.oz/"
                className="text-purple-200 hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@InfoNestOz"
                className="text-purple-200 hover:text-white"
              >
                <FaYoutube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-purple-200 hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="/post" className="text-purple-200 hover:text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-purple-200 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/post/blog"
                  className="text-purple-200 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/post/news"
                  className="text-purple-200 hover:text-white"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/post/bargain"
                  className="text-purple-200 hover:text-white"
                >
                  Bargain
                </Link>
              </li>
              <li>
                <Link
                  href="/post/commercial"
                  className="text-purple-200 hover:text-white"
                >
                  Business
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
                  href="/cookie-policy"
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
