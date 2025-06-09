import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Pill from '@/components/atoms/Pill';
import Button from '@/components/atoms/Button';

const ExamplesGridSection = ({ examples, onSelectExample, onCopyPrompt }) => {
    if (examples.length === 0) {
        return (
            <div className="text-center py-12">
                <ApperIcon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Examples Found
                </h3>
                <p className="text-gray-600">
                    Try selecting a different category or check back later for new examples.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <AnimatePresence>
                {examples.map((example, index) => (
                    <motion.div
                        key={example.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => onSelectExample(example)}
                    >
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {example.title}
                                </h3>
                                <Pill variant="default" className="text-xs">{example.category}</Pill>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {example.result?.description || 'A complete application built with Apper'}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2 text-sm">Features:</h4>
                            <div className="flex flex-wrap gap-1">
                                {example.result?.features?.slice(0, 3).map((feature, i) => (
                                    <Pill key={i} variant="primary" className="text-xs">{feature}</Pill>
                                ))}
                                {example.result?.features?.length > 3 && (
                                    <Pill variant="default" className="text-xs">
                                        +{example.result.features.length - 3} more
                                    </Pill>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <ApperIcon name="Code" size={14} />
                                <span>{example.result?.codeLines || '~300'} lines</span>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCopyPrompt(example.prompt);
                                }}
                                variant="link"
                                icon={ApperIcon}
                                iconProps={{ name: 'Copy', size: 14 }}
                                className="!px-1 !py-1 !font-normal"
                            >
                                <span>Copy</span>
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

ExamplesGridSection.propTypes = {
    examples: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectExample: PropTypes.func.isRequired,
    onCopyPrompt: PropTypes.func.isRequired,
};

export default ExamplesGridSection;