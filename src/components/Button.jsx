import React from 'react';

const Button = ({
    primary,
    basic,
    className,
    size,
    color,
    style,
    icon,
    children,
    content,
    ...buttonProps,
}) => {
    function generateClassName() {
        const classList = ['button'];
        if (primary) classList.push('primary');
        if (basic) classList.push('basic');
        if (icon) classList.push('icon');
        if (color) classList.push(color);
        if (className) classList.push(className);
        return classList.join(' ');
    }

    return (
        <button
            className={generateClassName()}
            style={{ fontSize: size && size, ...style }}
            {...buttonProps}
        >
            {icon && <i className={`fa fa-${icon}`} />}
            {children || content}
        </button>
    );
};

export default Button;
