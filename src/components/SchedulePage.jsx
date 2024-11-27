import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSchedule } from '../utils/api';

const SchedulePage = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSchedule = async () => {
            try {
                const data = await fetchSchedule();
                setSchedule(data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSchedule();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
                <p className="text-2xl font-semibold text-gray-800 animate-pulse">Loading Schedule...</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen py-10">
            <div className="container mx-auto px-6">
                {/* Page Heading */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Current Television Schedule
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore the programs currently airing in the US. Click on a show to view its details.
                    </p>
                </header>

                {/* Schedule Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {schedule.map((show) => (
                        <Link
                            to={`/show/${show.show.id}`}
                            key={show.show.id}
                            className="group relative transform transition-transform duration-300 hover:scale-105"
                        >
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Show Image */}
                                <img
                                    src={show.show.image?.medium || 'https://via.placeholder.com/210'}
                                    alt={show.show.name}
                                    className="w-full h-52 object-cover"
                                />
                                {/* Card Content */}
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-500">
                                        {show.show.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {show.show.genres?.join(', ') || 'Genre Not Available'}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <p className="text-white text-lg font-semibold">View Details</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
