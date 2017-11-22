// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Paper from 'material-ui/Paper';
import MenuBtn from './menuBtn';
import Places from './places';

// Styles
import Radium from 'radium';

// Prop types

const propTypes = {
  
};

const defaultProps = {
  style: null,
  onMenuClick: () => {},
  onPlaceSelected: () => {},
};

// SearchBar
class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      address: '',
    }
  }

  // Render

  render(){
    // Props
    const {
      style,
      onMenuClick,
      onPlaceSelected,
      onPlaceChanged,
    } = this.props;
    // State
    const {
      address,
    } = this.state;
    // Render
    return (
      <div style={[styles.container, style]}>
        <Paper style={styles.content}>
          <MenuBtn 
            style={styles.menuBtn}
            onClick={onMenuClick}
          />
          <Places 
            style={styles.search}
            onPlaceSelected={onPlaceSelected}
            onPlaceChanged={onPlaceChanged}
          />
        </Paper>
      </div>
    );
  }
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
    alignItems: 'center',
  },
  menuBtn: {

  },
  search: {
    width: 400,
  }
}

// Attach prop types
SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default Radium(SearchBar);