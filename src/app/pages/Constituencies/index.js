// Redux
import { connect } from 'react-redux';
// Store
import { selectors, actions } from 'store';
// Component
import Component from './component';

export default connect(
  state => ({
    constituencies: selectors.constituencies.get(state),
    configs: selectors.configs.get(state),
  }),
  dispatch => ({
    onConstituencyChange: item => dispatch(actions.constituencies.change(item)),
    onConfigsChange: (name, val) => dispatch(actions.configs.change(name, val)),
  })
)(Component);
