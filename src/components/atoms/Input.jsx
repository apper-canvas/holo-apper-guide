import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    value,
    onChange,
    placeholder,
    className,
    type = 'text',
    rows,
    readOnly,
    disabled,
    ...props
}) => {
    const baseStyle = 'w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent';

    if (type === 'textarea') {
        return (
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${baseStyle} resize-none ${className || ''}`}
                rows={rows}
                readOnly={readOnly}
                disabled={disabled}
                {...props}
            />
        );
    }

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseStyle} ${className || ''}`}
            readOnly={readOnly}
            disabled={disabled}
            {...props}
        />
    );
};

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'textarea']),
    rows: PropTypes.number, // Specific to textarea
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Input;