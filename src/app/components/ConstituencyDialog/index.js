// Redux
import { connect } from 'react-redux';
// Store
import { selectors } from 'store';
// Component
import Component from './component';

export default connect(
  state => ({
    deputies: selectors.deputies.get(state),
  }),
  dispatch => ({
    
  })
)(Component);
