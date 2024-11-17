import React from "react";
import Footer from "../Footer";

const DMCA = () => {
    return (
        <div>
        <div className="dmca-policy p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-12">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
                DMCA Policy
            </h1>
            <p className="text-gray-200 mb-4">
                Our website respects copyright laws and complies with the Digital
                Millennium Copyright Act (DMCA). If you believe your copyrighted
                material is being used on our site without authorization, you may file
                a DMCA takedown notice by following the procedures outlined below.
            </p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    How to Submit a Takedown Notice
                </h2>
                <p className="text-gray-200 mb-2">
                    To file a DMCA takedown notice, please include the following
                    information:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                    <li>Your full name and contact information (email, address, phone).</li>
                    <li>
                        A description of the copyrighted material you claim is being
                        infringed.
                    </li>
                    <li>The location (URL) of the infringing material on our website.</li>
                    <li>
                        A statement under penalty of perjury that the complaint is accurate
                        and you are the copyright owner or authorized to act on their
                        behalf.
                    </li>
                    <li>Your electronic or physical signature.</li>
                </ul>
                <p className="text-gray-200 mt-4">
                    Submit your DMCA takedown request to:{" "}
                    <a
                        href="#"
                        className="text-blue-500 underline"
                    >
                        dmca@yourwebsite.com
                    </a>
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    How to Submit a Counter-Notice
                </h2>
                <p className="text-gray-200 mb-2">
                    If you believe the material was removed by mistake or misidentification,
                    you may file a counter-notice. Include the following:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                    <li>Your full contact information (name, address, email).</li>
                    <li>
                        Identification of the material that was removed and its location
                        before removal.
                    </li>
                    <li>
                        A statement under penalty of perjury that the material was removed
                        in error or misidentification.
                    </li>
                    <li>
                        Your consent to the jurisdiction of the federal district court in
                        your location.
                    </li>
                </ul>
                <p className="text-gray-200 mt-4">
                    Send your counter-notice to:{" "}
                    <a
                        href="#"
                        className="text-blue-500 underline"
                    >
                        dmca@yourwebsite.com
                    </a>
                </p>
            </section>

            <p className="text-gray-200 text-sm mt-6">
                Note: Filing false claims under the DMCA may result in legal
                consequences. Please consult with legal counsel if you are unsure about
                the process.
            </p>
            </div>
            <Footer />
        </div>
    );
};

export default DMCA;
