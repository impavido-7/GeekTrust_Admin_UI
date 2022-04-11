import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

const DeleteEntry = (props) => {

    const { onClose, selectedValue, open } = props;

    const handleClose = (clickedYes = false) => {
        onClose(clickedYes);
    };

    const text = selectedValue ?
        "Are you sure, you want to delete this entry?" :
        "Are you sure, you want to delete all the selected entries?";

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleClose(false)}
                        variant="contained"
                        color="primary"
                    >
                        NO
                    </Button>
                    <Button
                        onClick={() => handleClose(true)}
                        variant="contained"
                        color="primary"
                    >
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default DeleteEntry;