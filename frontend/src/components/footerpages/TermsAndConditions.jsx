import React from "react";
import Footer from "../Footer";

const TermsAndConditions = () => {
  return (
    <div>
    <div className="terms-conditions bg-gray-100 text-gray-800 py-12 px-6">
      <div className="container max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to our website. By accessing or using this site, you agree to
          be bound by the following terms and conditions. If you do not agree
          to these terms, please do not use our website.
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using our website, you confirm that you have read,
            understood, and agree to these terms and conditions. We reserve the
            right to update or modify these terms at any time without prior
            notice.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Use of the Website</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>You may use the website for lawful purposes only.</li>
            <li>
              You must not use this website to distribute malware, spam, or
              unauthorized advertising.
            </li>
            <li>
              We reserve the right to restrict access to certain parts of the
              website at our discretion.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, trademarks, and intellectual property on this website
            are the property of the website owner or its licensors. You are not
            permitted to reproduce, distribute, or create derivative works
            without prior written consent.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            We are not liable for any damages or losses resulting from your use
            of this website. This includes, but is not limited to, data loss,
            service interruptions, or unauthorized access.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by and construed in accordance with the
            laws of your jurisdiction. Any disputes shall be resolved through
            the appropriate legal channels.
          </p>
        </section>

        <p className="text-gray-700 text-sm mt-4">
          If you have any questions about these terms and conditions, please
          contact us at{" "}
          <a
            href="mailto:support@yourwebsite.com"
            className="text-blue-500 underline"
          >
            support@yourwebsite.com
          </a>
          .
        </p>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Top
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default TermsAndConditions;
