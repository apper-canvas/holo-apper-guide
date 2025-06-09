import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const InfoBox = ({ children, title, iconName, variant = 'info', className, ...props }) => {
    const baseStyle = 'rounded-lg p-6';
    let iconColor = 'text-info';
    let boxStyle = 'bg-info/5 border border-info/20';

    if (variant === 'success') {
        iconColor = 'text-success';
        boxStyle = 'bg-success/5 border border-success/20';
    } else if (variant === 'warning') {
        iconColor = 'text-warning';
        boxStyle = 'bg-warning/5 border border-warning/20';
    } else if (variant === 'error') {
        iconColor = 'text-error';
        boxStyle = 'bg-error/5 border border-error/20';
    }

    const combinedClassName = `${baseStyle} ${boxStyle} ${className || ''}`;

    return (
        <div className={combinedClassName} {...props}>
            <div className="flex items-start space-x-3">
                {iconName && (
                    <ApperIcon name={iconName} size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} />
                )}
                <div className="flex-1">
                    {title && <h4 className="font-medium text-gray-900 mb-1">{title}</h4>}
                    {children}
                </div>
            </div>
        </div>
    );
};

InfoBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    iconName: PropTypes.string,
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    className: PropTypes.string,
};

export default InfoBox;