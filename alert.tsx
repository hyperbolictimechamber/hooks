import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  open: boolean;
  handleClose: (confirmed: boolean) => void;
  title: string;
  contentText: string;
  yesText: string;
  noText: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose, title, contentText, yesText, noText }) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          {noText}
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          {yesText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
