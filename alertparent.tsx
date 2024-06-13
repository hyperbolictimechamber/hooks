import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AlertDialog from './AlertDialog';
import Button from '@mui/material/Button';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirmed: boolean) => {
    setOpen(false);
    console.log(`User clicked ${confirmed ? "Yes" : "No"}`);
  };

  return (
    <div>
      <h1>My App</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Alert Dialog
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        title="Use Google's location service?"
        contentText="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        yesText="Yes"
        noText="No"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
