// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import IconButton from 'material-ui/IconButton';
// Styles
import Radium from 'radium';

// Prop types
const propTypes = {
  onClick: PropTypes.func,
};

// DefaultProps
const defaultProps = {
  onClick: () => {},
};

// SearchBtn
function SearchBtn({
    style = null,
    onClick,
}){
  // Render
  return (
    <IconButton 
      style={styles.btn}
      iconStyle={styles.icon}
      iconClassName="fa fa-bars"
      onClick={onClick}
    />
  );
}

// Style
const styles = {
  btn: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 20,
    height: 20,
    fontSize: 20,
    position: 'relative',
    left: -1,
    top: -1,
  }
}

// Attach prop types
SearchBtn.propTypes = propTypes;
SearchBtn.defaultProps = defaultProps;

export default Radium(SearchBtn);