import React from 'react';
import Footer from '../Footer';

const Disclaimer = () => {
    return (
        <section className="bg-gray-800 text-white pt-16">
            <div className="mb-6 w-full container m-auto">
                <h1 className="text-4xl font-bold cursor-pointer">
                    <a href="/" className="text-yellow-400">Bollyflix</a>
                </h1>
            </div>
            <div className="max-w-6xl mx-auto px-6 pb-16">
                {/* Disclaimer Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-yellow-400">Disclaimer</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        Please read the following disclaimer carefully before using our website.
                    </p>
                </div>

                {/* Disclaimer Content */}
                <div className="bg-black p-8 rounded-lg shadow-lg">
                    <p className="text-lg mb-6">
                        The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or completeness of the content available on this site. Any reliance you place on such information is strictly at your own risk.
                    </p>

                    <p className="text-lg mb-6">
                        We do not host or upload any content on our servers. All movie trailers, images, and content on this website are sourced from third-party services like The Movie Database (TMDb), YouTube, and others. The respective content owners hold all rights to their content.
                    </p>

                    <p className="text-lg mb-6">
                        In no event shall we be liable for any damages, losses, or inconveniences arising from the use of this website or the content therein, including but not limited to any issues with the accuracy of the data provided.
                    </p>

                    <p className="text-lg mb-6">
                        We reserve the right to modify or remove any content at our discretion, without notice. By using this website, you agree to comply with all applicable laws and regulations and acknowledge that you are using the site at your own risk.
                    </p>

                    <p className="text-lg">
                        For further inquiries or concerns, please visit our <a href="/contact" className="text-yellow-400 hover:underline">Contact</a> page.
                    </p>
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default Disclaimer;
