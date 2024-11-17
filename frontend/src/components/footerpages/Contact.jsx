import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Submitting...');
        // Simulate form submission logic (e.g., sending email or contacting backend)
        setTimeout(() => {
            setStatus('Message sent! Thank you for reaching out.');
            setFormData({ name: '', email: '', message: '' }); // Reset form fields
        }, 2000);
    };

    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="mb-6 w-full container m-auto">
                <h1 className="text-4xl font-bold cursor-pointer">
                    <a href="/" className="text-yellow-400">Bollyflix</a>
                </h1>
            </div>
            <div className="max-w-6xl mx-auto px-6">
                {/* Contact Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-yellow-400">Contact Us</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        Have a question or need help? Fill out the form below to get in touch with us.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-black p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-lg font-semibold">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-lg font-semibold">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-lg font-semibold">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Status Message */}
                    {status && (
                        <div className="mt-4 text-center">
                            <p className={`text-lg ${status === 'Message sent! Thank you for reaching out.' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {status}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
