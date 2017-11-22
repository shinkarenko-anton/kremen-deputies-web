// React
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Utils
import _ from 'lodash';
// UI
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'components/Dialog';
// Elements
import DeputieInfo from './DeputieInfo';

// PropTypes
const propTypes = {
  item: PropTypes.object.isRequired,
  deputies: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

// DefaultProps
const defaultProps = {
  open: false,
  onClose: null,
};

// Helpers

const constituencyToVotersCount = (constituency) => {
  let votersCount = 0;
  if (constituency.stations && constituency.stations.length) {
    _.each(constituency.stations, (station) => {
      if (station.numberOfVoters) {
        votersCount += parseInt(station.numberOfVoters, 10);
      }
    });
  }
  return votersCount;
};

// ConstituencyDialog
class ConstituencyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    // Render

  render() {
    const constituency = this.props.item;
    if (!constituency) return null;

    const votersCount = constituencyToVotersCount(constituency);

    // Actions
    const actions = [
      <FlatButton
        label="Закрити"
        primary
        onTouchTap={(e) => { e.stopPropagation(); this.props.onClose(); }}
      />,
    ];

    const deputies = _.map(constituency.deputies, deputieId => this.props.deputies[deputieId]);

    return (
      <Dialog
        title={`Виборчий округ №${constituency.number} (${votersCount} чоловік)`}
        actions={actions}
        open={this.props.open}
        onRequestClose={() => this.props.onClose()}
      >
        {_.map(deputies, (deputie, index) => (
          <DeputieInfo
            key={index}
            deputie={deputie}
            style={index > 0 ? { marginTop: 20, paddingTop: 20, borderTop: '1px dashed rgba(0, 0, 0, .4)' } : null}
          />
        ))}
      </Dialog>
    );
  }
}

ConstituencyDialog.propTypes = propTypes;
ConstituencyDialog.defaultProps = defaultProps;

export default ConstituencyDialog;
