import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CommunityResourcesSection = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    Community & Support
                </h2>
                <p className="text-gray-600 mb-6">
                    Connect with other Apper users and get additional help.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((resource, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <ApperIcon name={resource.icon} size={24} className="text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{resource.description}</p>
                                <Button
                                    variant="link"
                                    icon={ApperIcon}
                                    iconProps={{ name: 'ExternalLink', size: 16 }}
                                    className="!font-medium"
                                >
                                    <span>{resource.action}</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

CommunityResourcesSection.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
};

export default CommunityResourcesSection;