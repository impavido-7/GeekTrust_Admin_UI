import React, { useContext, useEffect, useState } from "react";

import { Context as DataContext } from "../context/dataContext";

import { TextField } from "@material-ui/core";

import NoResults from "./NoResults";
import Pagination from "./Pagination";

import "../CSS/mystyles.css";

const HomeScreen = () => {

    const { state: { data }, getData, deleteMultipleEntries, deleteItem, editItem } = useContext(DataContext);

    const [filterData, setFilterData] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFilter = (val) => {
        // const val = e.target.value;
        setFilterData(val);

        if (val.length === 0) {
            setFilteredData(null);
        }
        else {
            const array = [...data]
            const filteredArray = [];

            array.forEach(item => {
                for (let x in item) {
                    const value = item[x].toString().toLowerCase();
                    if (value.includes(val.toLowerCase())) {
                        filteredArray.push(item);
                        break;
                    }
                }
            });

            setFilteredData(filteredArray);

        }
    }

    const deleteAllSelectedEntries = (indexes) => {
        deleteMultipleEntries(indexes, data);
    }

    const deleteSelectedEntry = (id) => {
        deleteItem(id, data);
    }

    const editSelectedEntry = (obj) => {
        editItem(obj, data);
    }

    useEffect(() => {
        onFilter(filterData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(data)]);

    const entries = filteredData || data;

    return (
        <>
            <div className="filter">
                <TextField
                    label="Search by name, email or role"
                    variant="outlined"
                    fullWidth
                    value={filterData}
                    onChange={(e) => onFilter(e.target.value)}
                />
            </div>
            {
                entries ?
                    entries.length === 0 ?
                        <NoResults /> :
                        <Pagination
                            data={entries}
                            noOfEntries={10}
                            deleteAllSelectedEntries={deleteAllSelectedEntries}
                            deleteSelectedEntry={deleteSelectedEntry}
                            editSelectedEntry={editSelectedEntry}
                        />
                    :
                    null
            }
        </>
    )
}

export default HomeScreen;