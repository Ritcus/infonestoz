import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function CookiePolicy() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:py-24 shadow-md rounded-xl">
      <div className="mb-8">
        <button className="mb-4 text-purple-900 hover:bg-purple-100">
          <Link href="/" className="flex items-center gap-2">
            <FaChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </button>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground">Last updated: May 3, 2023</p>
      </div>

      <div className="prose prose-purple max-w-none">
        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          Introduction
        </h2>
        <p>
          This Cookie Policy explains how InfoNestOz (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;) uses
          cookies and similar technologies to recognize you when you visit our
          website at [yourblogdomain.com] (&apos;Website&apos;). It explains what these
          technologies are and why we use them, as well as your rights to
          control our use of them.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          What are cookies?
        </h2>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
        <p>
          Cookies set by the website owner (in this case, InfoNestOz) are called
          &apos;first-party cookies&apos;. Cookies set by parties other than the website
          owner are called &apos;third-party cookies&apos;. Third-party cookies enable
          third-party features or functionality to be provided on or through the
          website (e.g., advertising, interactive content, and analytics). The
          parties that set these third-party cookies can recognize your computer
          both when it visits the website in question and also when it visits
          certain other websites.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          Why do we use cookies?
        </h2>
        <p>
          We use first-party and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Website to
          operate, and we refer to these as &apos;essential&apos; or &apos;strictly necessary&apos;
          cookies. Other cookies also enable us to track and target the
          interests of our users to enhance the experience on our Website. Third
          parties serve cookies through our Website for analytics and other
          purposes.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          The specific types of cookies served through our Website and the
          purposes they perform
        </h2>

        <h3 className="text-xl font-medium text-purple-800 mt-6 mb-3">
          Essential website cookies:
        </h3>
        <p>
          These cookies are strictly necessary to provide you with services
          available through our Website and to use some of its features, such as
          access to secure areas.
        </p>

        <h3 className="text-xl font-medium text-purple-800 mt-6 mb-3">
          Performance and functionality cookies:
        </h3>
        <p>
          These cookies are used to enhance the performance and functionality of
          our Website but are non-essential to their use. However, without these
          cookies, certain functionality may become unavailable.
        </p>

        <h3 className="text-xl font-medium text-purple-800 mt-6 mb-3">
          Analytics and customization cookies:
        </h3>
        <p>
          These cookies collect information that is used either in aggregate
          form to help us understand how our Website is being used or how
          effective our marketing campaigns are, or to help us customize our
          Website for you.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          How can you control cookies?
        </h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager. The Cookie Consent Manager allows you to
          select which categories of cookies you accept or reject. Essential
          cookies cannot be rejected as they are strictly necessary to provide
          you with services.
        </p>

        <p>
          You can also set or amend your web browser controls to accept or
          refuse cookies. If you choose to reject cookies, you may still use our
          website though your access to some functionality and areas of our
          website may be restricted. As the means by which you can refuse
          cookies through your web browser controls vary from
          browser-to-browser, you should visit your browser&apos;s help menu for more
          information.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          Changes to this Cookie Policy
        </h2>
        <p>
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal, or regulatory reasons. Please therefore revisit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
        </p>

        <p>
          The date at the top of this Cookie Policy indicates when it was last
          updated.
        </p>

        <h2 className="text-2xl font-semibold text-purple-900 mt-8 mb-4">
          Contact us
        </h2>
        <p>
          If you have any questions about our use of cookies or other
          technologies, please email us at [your-email@domain.com].
        </p>
      </div>
    </div>
  );
}
