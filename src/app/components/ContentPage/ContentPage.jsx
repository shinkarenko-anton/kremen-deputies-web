// React
import React from 'react';
import PropTypes from 'prop-types';
// UI
import Paper from 'material-ui/Paper';

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
  return (
    <div className="content-page">
      <Paper className="content-page__content">
        {props.children}
      </Paper>
    </div>
  );
}

ContentPage.propTypes = propTypes;
ContentPage.defaultProps = defaultProps;

export default ContentPage;
