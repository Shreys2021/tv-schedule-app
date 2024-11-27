import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShowDetails } from '../utils/api';

const ShowDetails = () => {
    const { id } = useParams();
    const [showDetails, setShowDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadShowDetails = async () => {
            try {
                const data = await fetchShowDetails(id);
                setShowDetails(data);
            } catch (error) {
                console.error('Error fetching show details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadShowDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
                <p className="text-2xl font-semibold text-gray-800 animate-pulse">Loading Show Details...</p>
            </div>
        );
    }

    if (!showDetails) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
                <p className="text-2xl font-semibold text-red-500">Show not found!</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen py-10">
            <div className="container mx-auto px-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={showDetails.image?.original || 'https://via.placeholder.com/400'}
                        alt={showDetails.name}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">{showDetails.name}</h1>
                        <p
                            className="text-gray-700 leading-relaxed mb-8 text-lg"
                            dangerouslySetInnerHTML={{ __html: showDetails.summary }}
                        ></p>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="text-sm text-gray-700 space-y-2">
                                <p>
                                    <span className="font-semibold">Language:</span> {showDetails.language}
                                </p>
                                <p>
                                    <span className="font-semibold">Genres:</span>{' '}
                                    {showDetails.genres?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-semibold">Premiered:</span> {showDetails.premiered || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-semibold">Runtime:</span> {showDetails.runtime || 'N/A'}{' '}
                                    minutes
                                </p>
                                <p>
                                    <span className="font-semibold">Rating:</span>{' '}
                                    {showDetails.rating?.average || 'Not Rated'}
                                </p>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <a
                                    href={showDetails.officialSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition transform"
                                >
                                    Visit Official Site
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        to="/"
                        className="inline-block bg-gradient-to-r from-teal-400 to-green-500 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold hover:scale-105 transform transition"
                    >
                        Back to Schedule
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
