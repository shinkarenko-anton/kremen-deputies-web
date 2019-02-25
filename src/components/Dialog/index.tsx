import Paper from '@material-ui/core/Paper';
import { View } from 'components/UI';
import React, { PureComponent, ReactNode, SyntheticEvent } from 'react';
import './index.scss';

interface IProps {
  open?: boolean;
  title?: string;
  actions?: ReactNode[];
  children?: ReactNode;
  onClose?: (e: SyntheticEvent) => void;
}

export default class Dialog extends PureComponent<IProps> {
  private onContainerClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
  }

  public render() {
    const { open, actions, title, children } = this.props;
    let contClassName = 'sa-modal-dialog';
    if (open) {
      contClassName += ' sa-modal-dialog-open';
    } else {
      contClassName += ' sa-modal-dialog-close';
    }

    return (
      <View
        className={contClassName}
        onClick={this.onContainerClick}
      >
        <View className="sa-modal-dialog__wrap">
          <Paper className="sa-modal-dialog__container">
            {!!title && (
              <h2 className="sa-modal-dialog__title">
                {title}
              </h2>
            )}
            {children}
            {(actions && actions.length) && (
              <View className="sa-modal-dialog__actions">
                {actions.map((action, key) => (
                  <View key={key} className="sa-modal-dialog__action">
                    {action}
                  </View>
                ))}
              </View>
            )}
          </Paper>
        </View>
      </View>
    );
  }
}
