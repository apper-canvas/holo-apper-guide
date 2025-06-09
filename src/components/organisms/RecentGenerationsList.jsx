import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const RecentGenerationsList = ({ history, onSelectHistoryItem }) => {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Generations
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {history.map((item, index) => (
                    <motion.button
                        key={item.id}
                        onClick={() => onSelectHistoryItem(item)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900">
                                {item.result.type}
                            </span>
                            <span className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">
                            {item.prompt}
                        </p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

RecentGenerationsList.propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired,
        result: PropTypes.object.isRequired,
        timestamp: PropTypes.instanceOf(Date).isRequired,
    })).isRequired,
    onSelectHistoryItem: PropTypes.func.isRequired,
};

export default RecentGenerationsList;