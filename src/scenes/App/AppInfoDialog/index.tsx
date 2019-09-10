import { Dialog, DialogContent } from '@material-ui/core';
import { ClosableDialogTitle } from 'components/Dialogs';
import React, { CSSProperties, FC } from 'react';
import AppInfo from './components/AppInfo';

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

export const AppInfoDialog: FC<IProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open ? open : false}
      onClose={onClose}
    >
      <ClosableDialogTitle onClose={onClose}>
        Про додаток
      </ClosableDialogTitle>
      <DialogContent>
        <AppInfo />
      </DialogContent>
    </Dialog>
  );
};
