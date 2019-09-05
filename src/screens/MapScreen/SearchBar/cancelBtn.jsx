// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import IconButton from 'material-ui/IconButton';
// Styles
import Radium from 'radium';

// Assets
import crossIcon from 'assets/img/icons/cancel.svg';

// Prop types
const propTypes = {
  
};

// DefaultProps
const defaultProps = {
  styles: null,
};

// CancelBtn
function CancelBtn({
  style,
  onClick,
}){
  // Render
  return (
    <div style={[styles.container, style]}>
      <IconButton 
        style={styles.btn}
        iconStyle={styles.btnIcon}
        onClick={onClick}
      >
        <img src={crossIcon} />
      </IconButton>
    </div>
  );
}

// Style
const styles = {
  container: {

  },
  btn: {
    width: 40,
    height: 40,
  },
  btnIcon: {
    width: 16,
    height: 16,
  },
  icon: {
    
  }
}

// Attach prop types
CancelBtn.propTypes = propTypes;
CancelBtn.defaultProps = defaultProps;

export default Radium(CancelBtn);