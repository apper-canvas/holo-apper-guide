import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Pill from '@/components/atoms/Pill';

const ExampleDetailModal = ({ example, onClose, onCopyPrompt }) => {
    if (!example) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-heading font-bold text-gray-900">
                                {example.title}
                            </h2>
                            <Button
                                onClick={onClose}
                                variant="textOnly"
                                title="Close"
                                icon={ApperIcon}
                                iconProps={{ name: 'X', size: 20 }}
                                className="!p-2 hover:bg-gray-100"
                            />
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* App Details */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">App Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Type</h4>
                                    <Pill variant="primary">{example.result?.type || example.category}</Pill>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Complexity</h4>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full ${
                                                        i < 3 ? 'bg-primary' : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">Intermediate</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {example.result?.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <ApperIcon name="Check" size={16} className="text-success" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Components */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Components</h3>
                            <div className="flex flex-wrap gap-2">
                                {example.result?.components?.map((component, index) => (
                                    <Pill key={index} variant="default" className="!rounded-lg">{component}</Pill>
                                ))}
                            </div>
                        </div>

                        {/* Original Prompt */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Original Prompt</h3>
                                <Button
                                    onClick={() => onCopyPrompt(example.prompt)}
                                    variant="secondary"
                                    icon={ApperIcon}
                                    iconProps={{ name: 'Copy', size: 14 }}
                                    className="!px-3 !py-1 text-sm border-primary/20 hover:bg-primary/5"
                                >
                                    <span>Copy Prompt</span>
                                </Button>
                            </div>
                            <div className="code-block">
                                <pre className="whitespace-pre-wrap text-sm">
                                    {example.prompt}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

ExampleDetailModal.propTypes = {
    example: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onCopyPrompt: PropTypes.func.isRequired,
};

export default ExampleDetailModal;