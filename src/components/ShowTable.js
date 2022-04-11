import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

import EditScreen from "./EditScreen";
import DeleteEntry from "./DeleteEntry";

const ShowTable = ({ data, deleteAllSelectedEntries, deleteSelectedEntry, editSelectedEntry }) => {

    const [selectAllSelected, setSelectAllSelected] = useState(false);
    const [selectedObject, setSelectedObj] = useState({});
    const [editClicked, setEditClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [entrySelected, setEntrySelected] = useState({});
    const [deleteAllEntries, setDeleteAllEntries] = useState(false);

    const setValue = (selectObj = {}, id, value) => {
        selectObj[id] = value;
    }

    const setObject = (val) => {
        const selectObj = {};
        data.forEach(item => {
            setValue(selectObj, item.id, val);
        });
        setSelectedObj(selectObj);
    }

    const selectIndividual = (e) => {
        const selectObj = { ...selectedObject };
        selectObj[e.target.id] = !selectObj[e.target.id];
        setSelectedObj(selectObj);
    }

    const selectAll = (e) => {
        setSelectAllSelected(prevValue => !prevValue);
        setObject(e.target.checked);
    }

    const editSelected = (val) => {
        setEntrySelected(val);
        setEditClicked(true);
    }

    const deleteSelected = (val) => {
        setEntrySelected(val);
        setDeleteClicked(true);
    }

    const deleteAll = () => {
        const indexes = [];
        for (let x in selectedObject) {
            if (selectedObject[x] === true) {
                indexes.push(x);
            }
        }
        deleteAllSelectedEntries(indexes);
    }

    const handleClose = (clickedYes, obj = null) => {
        if (clickedYes && deleteAllEntries) {
            deleteAll();
            setSelectAllSelected(false);
        }
        else if (clickedYes && deleteClicked) {
            deleteSelectedEntry(entrySelected.id);
        }
        else if (clickedYes && editClicked) {
            editSelectedEntry(obj);
        }
        setEditClicked(false);
        setDeleteClicked(false);
        setDeleteAllEntries(false);
        setEntrySelected({});
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const entries = Object.keys(data[0]).slice(1); // Assuming the first entry is "id" always

    if (editClicked === true) {
        return (
            <>
                <EditScreen
                    selectedValue={entrySelected}
                    open={editClicked}
                    onClose={handleClose}
                    data={data}
                />
            </>
        )
    }

    else if (deleteClicked === true || deleteAllEntries === true) {
        return (
            <>
                <DeleteEntry
                    selectedValue={entrySelected.id}
                    open={deleteClicked || deleteAllEntries}
                    onClose={handleClose}
                    data={data}
                />
            </>
        )
    }


    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input
                                id="selectAll"
                                checked={selectAllSelected}
                                onChange={selectAll}
                                type="checkbox"
                            />
                        </th>
                        <th> {capitalizeFirstLetter(entries[0])} </th>
                        <th> {capitalizeFirstLetter(entries[1])} </th>
                        <th> {capitalizeFirstLetter(entries[2])} </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => {
                            //console.log(selectObj)
                            return (
                                <tr key={item.id} className={selectedObject[item.id] ? "selectedRow" : null}>
                                    <td>
                                        <input
                                            id={item.id}
                                            type="checkbox"
                                            checked={selectedObject[item.id] || false}
                                            onChange={selectIndividual}
                                        />
                                    </td>
                                    <td> {item[entries[0]]} </td>
                                    <td> {item[entries[1]]} </td>
                                    <td> {item[entries[2]]} </td>
                                    <td>
                                        <span>
                                            <FiEdit
                                                onClick={() => editSelected(item)}
                                            />
                                        </span>
                                        <span>
                                            <FiTrash
                                                className="delete"
                                                onClick={() => deleteSelected(item)}
                                            />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <button
                className="deleteSelectedButton"
                onClick={() => setDeleteAllEntries(true)}
            >
                Delete Selected
            </button>

        </>
    );
}

export default ShowTable;