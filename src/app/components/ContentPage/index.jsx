// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Paper from 'material-ui/Paper';
// Styles
import Radium from 'radium';
import { colors, sizes } from 'styles'

// PropTypes
const propTypes = {
  children: PropTypes.array,
};

// DefaultProps
const defaultProps = {
  children: null,
};

// ContentPage
function ContentPage(props) {
  // Props
  const { style } = props;
  // Render
  return (
    <div style={[styles.container, style]}>
      <Paper 
        className="g-img-100"
        style={styles.content} 
      >
        { props.children }
      </Paper>
    </div>
  );
}

// Styles

const styles = {
  container: {
    backgroundColor: '#eee',
    padding: '30px 0',
    [`@media (max-width: ${sizes.screens.phone})`]: {
      padding: 0,
    },
  },
  content: {
    maxWidth: '768px',
    margin: '0 auto',
    padding: '20px 30px',
  },
}

// Attaching prop types

ContentPage.propTypes = propTypes;
ContentPage.defaultProps = defaultProps;

export default Radium(ContentPage);
