import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Edumanage. All rights reserved.</p>
                <div className="mt-4">
                    <a href="/about" className="mx-4 hover:underline">About</a>
                    <a href="/contact" className="mx-4 hover:underline">Contact</a>
                    <a href="/privacy" className="mx-4 hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
