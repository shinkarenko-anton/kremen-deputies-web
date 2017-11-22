// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Paper from 'material-ui/Paper';
import MenuBtn from './menuBtn';
import Places from './places';
import CancelBtn from './cancelBtn';

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

  // Events

  onCancelClick = () => {
    const { onCancelClick } = this.props;
    this.setState({address: ''});
    onCancelClick();
  }

  onPlaceChanged = (address) => {
    const { onPlaceChanged } = this.props;
    this.setState({address});
    onPlaceChanged(address);
  }

  // Render

  render(){
    // Props
    const {
      style,
      onMenuClick,
      onPlaceSelected,
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
            value={address}
            onPlaceSelected={onPlaceSelected}
            onPlaceChanged={this.onPlaceChanged}
          />
          {address ? (
            <CancelBtn
              style={styles.cancelBtn}
              onClick={this.onCancelClick}
            />
          ) : null}
        </Paper>
      </div>
    );
  }
}

// Styles

const styles = {
  container: {
    width: 400,
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
  cancelBtn: {
    marginLeft: 10,
  },
  search: {
    flex: 1,
  }
}

// Attach prop types
SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default Radium(SearchBar);