import React from 'react';
import FotterDetail from '../FotterDetail';
import Footer from '../Footer';

const About = () => {
    return (
        <section className="bg-gray-900 text-white pt-16">
            <div className="mb-6 w-full container m-auto">
                <h1 className="text-4xl font-bold cursor-pointer">
                    <a href="/" className="text-yellow-400">Bollyflix</a>
                </h1>
            </div>
            <div className="max-w-7xl mx-auto px-6">
                {/* About Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-yellow-400">About Bollyflix</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        Bollyflix is your one-stop platform for watching movies, exploring trailers, and diving deep into movie overviews.
                        Whether you're looking for your next favorite film or just browsing trailers, we've got you covered.
                    </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="bg-black p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Stream Movies</h3>
                        <p className="text-lg">
                            Watch your favorite movies in high quality. We offer an extensive library of films to choose from across genres.
                        </p>
                    </div>

                    <div className="bg-black p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Watch Trailers</h3>
                        <p className="text-lg">
                            Stay up to date with the latest movie trailers. Get a sneak peek of upcoming releases and upcoming blockbusters.
                        </p>
                    </div>

                    <div className="bg-black p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Explore Movie Overviews</h3>
                        <p className="text-lg">
                            Dive deep into the details of each movie, including cast information, plot summaries, and more.
                        </p>
                    </div>
                </div>

                {/* How it Works */}
                <div className="my-16 text-center">
                    <h3 className="text-3xl font-bold mb-4">How Bollyflix Works</h3>
                    <p className="text-lg max-w-2xl mx-auto">
                        Bollyflix makes it easy for you to browse, watch, and explore movies at the click of a button.
                        Simply search for the movie you want to watch, view its trailer, and get all the details you need to decide if it's your next film to watch.
                    </p>
                </div>

                {/* Contact Section */}

                <FotterDetail />
                <Footer />
            </div>
        </section>
    );
};

export default About;
