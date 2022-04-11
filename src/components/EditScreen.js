import React, { useState } from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const EditScreen = (props) => {
    const { onClose, selectedValue, open } = props;

    // const entries = Object.keys(selectedValue).slice(1); // Assuming the first entry is "id" always
    // const [selectedValueObject, setSelectedValueObject] = useState(selectedValue);

    const [name, setName] = useState(selectedValue.name);
    const [email, setEmail] = useState(selectedValue.email);
    const [role, setRole] = useState(selectedValue.role);
    const [errorObject, setErrorObject] = useState({});

    const handleClose = (clickedYes, obj = null) => {
        onClose(clickedYes, obj);
    };

    const editEntry = () => {

        const obj = { ...errorObject };
        let isCorrectForm = true;

        // Testing the name
        if (name.length === 0) {
            obj["name"] = "Enter a valid name";
            isCorrectForm = false;
        }
        else {
            obj["name"] = "";
        }

        // Testing email
        var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexp.test(String(email).toLowerCase())) {
            obj["email"] = "Enter a valid mail id";
            isCorrectForm = false;
        }
        else {
            obj["email"] = "";
        }

        if (isCorrectForm) {
            const obj = {
                id: selectedValue.id,
                name,
                email,
                role
            }
            handleClose(true, obj);
        }

        else {
            setErrorObject(obj);
        }

    }

    // const capitalizeFirstLetter = (str) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // }
    // const changeValue = (val, entry) => {
    //     const obj = { ...selectedValueObject };
    //     obj[entry] = val;
    //     setSelectedValueObject(obj);
    // }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>

                <DialogTitle>
                    Edit Details
                </DialogTitle>

                <DialogContent>
                    {/* {
                        entries.map((item, index) => {
                            return (
                                <div key={index} className="spacer">
                                    <TextField
                                        id="outlined-required"
                                        label={capitalizeFirstLetter(item)}
                                        value={selectedValueObject[item]}
                                        onChange={(e) => changeValue(e.target.value, item)}
                                    />
                                    {
                                        errorObject["name"] && <p className='error'> {errorObject["name"]} </p>
                                    }
                                </div>
                            )
                        })
                    } */}
                    <div className="spacer">
                        <TextField
                            id="outlined-required"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {
                            errorObject["name"] && <p className='error'> {errorObject["name"]} </p>
                        }
                    </div>
                    <div className='spacer'>
                        <TextField
                            id="outlined-required"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {
                            errorObject["email"] && <p className='error'> {errorObject["email"]} </p>
                        }
                    </div>
                    <div className='spacer'>
                        <Select
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="admin"> Admin </MenuItem>
                            <MenuItem value="member"> Member </MenuItem>
                        </Select>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => handleClose(false)}
                        variant="contained"
                        color="primary"
                    >
                        CLOSE
                    </Button>
                    <Button
                        onClick={editEntry}
                        variant="contained"
                        color="primary"
                    >
                        SAVE
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default EditScreen;
