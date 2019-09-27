import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);


class SearchSelect extends Component {
    render() {
        return (
            <Select
                options={this.props.options}
                isClearable={this.props.isClearable}
                formatGroupLabel={formatGroupLabel}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}

SearchSelect.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        label: PropTypes.string,
    })).isRequired,
    isClearable: PropTypes.bool,
};

export default SearchSelect;
