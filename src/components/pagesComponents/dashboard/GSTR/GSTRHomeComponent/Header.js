import React from 'react';
import PropTypes from 'prop-types';

function TextComponent({ children, className }) {
  return (
    <p className={`text-base font-semibold text-white ${className}`}>
      {children}
    </p>
  );
}

TextComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TextComponent.defaultProps = {
  className: '',
};

function ColorComponent({ children, className }) {
  return (
    <div
      className={`
        flex flex-col md:flex-row md:items-center flex-wrap justify-between
        gap-4 md:gap-6
        py-4 px-6 md:px-10
        w-full max-w-full
        border border-solid rounded-md
        bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600
        border-blue-500
        ${className}
      `}
    >
      {children}
    </div>
  );
}

ColorComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ColorComponent.defaultProps = {
  className: '',
};

function Header() {
  return (
    <header>
      <ColorComponent>
        <TextComponent className="truncate max-w-xs md:max-w-none">
          AAR PHARMACY (23DNNPS1..)
        </TextComponent>
        <TextComponent className="my-2 md:my-0 whitespace-nowrap">
          Itax Easy Private Limited
        </TextComponent>
        <div className="flex justify-start md:justify-end w-full md:w-auto">
          <TextComponent>F.Y: 2022-23 (Dec)</TextComponent>
        </div>
      </ColorComponent>
    </header>
  );
}

export default Header;
