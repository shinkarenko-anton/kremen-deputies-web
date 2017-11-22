// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Paper from 'material-ui/Paper';
import MenuBtn from './menuBtn';
// Styles
import Radium from 'radium';

// Prop types

const propTypes = {
  
};

const defaultProps = {
  onMenuClick: () => {},
};

// SearchBar
function SearchBar({
  style = null,
  onMenuClick,
}){
  // Render
  return (
    <div style={[styles.container, style]}>
      <Paper style={styles.content}>
        <MenuBtn 
          style={styles.menuBtn}
          onClick={onMenuClick}
        />
      </Paper>
    </div>
  );
}

// Styles

const styles = {
  container: {
  
  },
  content: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  menuBtn: {

  },
}

// Attach prop types
SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default Radium(SearchBar);