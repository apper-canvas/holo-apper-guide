import React from 'react';
import { motion } from 'framer-motion';
import StatDisplay from '@/components/molecules/StatDisplay';

const HomeStatsOverview = () => {
    const stats = [
        { value: '10,000+', label: 'Apps Created' },
        { value: '5,000+', label: 'Happy Builders' },
        { value: '24/7', label: 'Support Available' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center"
        >
            <h2 className="text-2xl font-heading font-bold mb-6">
                Join Thousands of Builders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <StatDisplay key={index} value={stat.value} label={stat.label} />
                ))}
            </div>
        </motion.div>
    );
};

export default HomeStatsOverview;