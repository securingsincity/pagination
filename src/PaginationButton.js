import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';

import SafeAnchor from 'react-bootstrap/lib/SafeAnchor';
import createChainedFunction from 'react-bootstrap/lib/utils/createChainedFunction';


const propTypes = {
  componentClass: elementType,
  className: PropTypes.string,
  eventKey: PropTypes.any,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  componentClass: SafeAnchor,
  active: false,
  disabled: false
};

class PaginationButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { disabled, onSelect, eventKey } = this.props;

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      componentClass: Component,
      active,
      disabled,
      onClick,
      className,
      style,
      ...props
    } = this.props;

    if (Component === SafeAnchor) {
      // Assume that custom components want `eventKey`.
      delete props.eventKey;
    }

    delete props.onSelect;

    return (
      <li
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <Component
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

PaginationButton.propTypes = propTypes;
PaginationButton.defaultProps = defaultProps;

export default PaginationButton;
