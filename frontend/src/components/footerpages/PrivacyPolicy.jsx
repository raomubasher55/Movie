import React from 'react';
import Footer from '../Footer';

const PrivacyPolicy = () => {
    return (
        <section className="bg-gray-800 text-white pt-16">
            <div className="mb-6 w-full container m-auto">
                <h1 className="text-4xl font-bold cursor-pointer">
                    <a href="/" className="text-yellow-400">Bollyflix</a>
                </h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">
                {/* Privacy Policy Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-yellow-400">Privacy Policy</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        Your privacy is important to us. Please read the following policy to understand how we collect, use, and protect your information.
                    </p>
                </div>

                {/* Privacy Policy Content */}
                <div className="bg-black p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">1. Information We Collect</h3>
                    <p className="text-lg mb-6">
                        We collect the following types of information when you visit our website:
                    </p>
                    <ul className="list-disc pl-6 text-lg mb-6">
                        <li>Personal Information: Name, email address, and contact details when you sign up or interact with the website.</li>
                        <li>Usage Data: Information about how you interact with the website, such as the pages you visit, and the features you use.</li>
                        <li>Cookies: We use cookies to improve your experience, such as remembering your preferences or login details.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h3>
                    <p className="text-lg mb-6">
                        We use the information we collect for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 text-lg mb-6">
                        <li>To personalize your experience and content recommendations.</li>
                        <li>To improve our website's functionality and user experience.</li>
                        <li>To communicate with you regarding updates, news, and promotions (if you’ve opted in).</li>
                        <li>To analyze user behavior and trends for better service optimization.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mb-4">3. Data Protection</h3>
                    <p className="text-lg mb-6">
                        We take appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of data transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h3>
                    <p className="text-lg mb-6">
                        We do not sell, trade, or rent your personal information to third parties. However, we may share non-personal information with third-party services for analytics and advertising purposes, or when required by law.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">5. Your Rights</h3>
                    <p className="text-lg mb-6">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 text-lg mb-6">
                        <li>Access, update, or delete your personal information at any time.</li>
                        <li>Opt-out of receiving promotional emails or newsletters.</li>
                        <li>Request that we stop processing your data in certain situations.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mb-4">6. Changes to This Privacy Policy</h3>
                    <p className="text-lg mb-6">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page, and the changes will take effect immediately upon posting.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">7. Contact Us</h3>
                    <p className="text-lg mb-6">
                        If you have any questions or concerns about this Privacy Policy or your data, please contact us via our <a href="/contact" className="text-yellow-400 hover:underline">Contact</a> page.
                    </p>
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default PrivacyPolicy;
