import Button from '@material-ui/core/Button';
import { IConstituency, IDeputiesMap } from 'common';
import Dialog from 'components/Dialog';
import { compact } from 'lodash';
import React, { MouseEvent, PureComponent } from 'react';
import { IBaseStyles } from 'styles';
import DeputieInfo from './components/DeputieInfo';

interface IProps {
  open?: boolean;
  item: IConstituency;
  deputies: IDeputiesMap;
  onClose: () => void;
}

const constituencyToVotersCount = ({ stations }: IConstituency) => {
  let votersCount = 0;
  if (stations && stations.length) {
    stations.forEach((station) => {
      if (station.numberOfVoters) {
        votersCount += station.numberOfVoters;
      }
    });
  }
  return votersCount;
};

export class ConstituencyDialog extends PureComponent<IProps> {
  private onCloseClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onClose();
  }
  render() {
    const { item, onClose } = this.props;
    if (!item || !item.deputies) { return null; }
    const votersCount = constituencyToVotersCount(item);

    const actions = [(
      <Button onClick={this.onCloseClick}>Закрити</Button>
    )];

    const deputies = compact(item.deputies.map((deputieId) => this.props.deputies[deputieId]));

    return (
      <Dialog
        title={`Виборчий округ №${item.number} (${votersCount} чоловік)`}
        actions={actions}
        open={this.props.open}
        onClose={onClose}
      >
        {deputies.map((deputie, index) => (
          <DeputieInfo
            key={index}
            style={index > 0 ? styles.itemBorder  : undefined}
            item={deputie}
          />
        ))}
      </Dialog>
    );
  }
}

const styles: IBaseStyles = {
  itemBorder: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: '1px dashed rgba(0, 0, 0, .4)',
  },
};
