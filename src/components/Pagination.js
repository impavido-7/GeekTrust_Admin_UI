import React, { useState } from "react";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

// import { Context as DataContext } from "../context/dataContext";

import ShowTable from "./ShowTable";

const Pagination = ({ data, noOfEntries, deleteAllSelectedEntries, deleteSelectedEntry, editSelectedEntry }) => {

    // const { deleteMultipleEntries, deleteItem, editItem } = useContext(DataContext);

    const [pageSelected, setPageSelected] = useState(1);

    const noOfPages = Math.ceil(data.length / noOfEntries);

    const getPaginationData = (page) => {
        const entryStart = (page - 1) * noOfEntries;
        const entryEnd = entryStart + noOfEntries;
        const entries = data.slice(entryStart, entryEnd);
        if (entries.length === 0) {
            setPageSelected(prevPage => prevPage - 1);
        }
        else {
            return entries;
        }
    }

    // const deleteAllSelectedEntries = (indexes) => {
    //     deleteMultipleEntries(indexes, data);
    //     callFilter();
    // }

    // const deleteSelectedEntry = (id) => {
    //     deleteItem(id, data);
    //     callFilter();
    // }

    // const editSelectedEntry = (obj) => {
    //     editItem(obj, data);
    //     callFilter();
    // }

    const isDisable = (pageToBeChecked) => {
        if (pageSelected === pageToBeChecked) {
            return true;
        }
        return false;
    }

    const getClassName = (pageToBeChecked) => {
        if (isDisable(pageToBeChecked)) {
            return "disabled";
        }
        return "makeCircleBorder"
    }

    const movePage = (pageNumber) => {
        setPageSelected(pageNumber);
    }

    const setPages = () => {

        const elements = [];

        // Move to the first page
        elements.push(
            <button
                key={elements.length}
                disabled={isDisable(1)}
                className={getClassName(1)}
                onClick={() => movePage(1)}
            >
                <FiChevronsLeft />
            </button>
        );

        // Move to the previous page
        elements.push(
            <button
                key={elements.length}
                disabled={isDisable(1)}
                className={getClassName(1)}
                onClick={() => movePage(pageSelected - 1)}
            >
                <FiChevronLeft />
            </button>
        );

        for (let i = 1; i <= noOfPages; i++) {
            elements.push(
                <button
                    key={elements.length}
                    className={pageSelected === i ? "pageSelected makeCircleBorder" : "makeCircleBorder"}
                    onClick={() => movePage(i)}
                >
                    {i}
                </button>
            );
        }

        // Move to the next page
        elements.push(
            <button
                key={elements.length}
                disabled={isDisable(noOfPages)}
                className={getClassName(noOfPages)}
                onClick={() => movePage(pageSelected + 1)}
            >
                <FiChevronRight />
            </button>
        );

        // Move to the last page
        elements.push(
            <button
                key={elements.length}
                disabled={isDisable(noOfPages)}
                className={getClassName(noOfPages)}
                onClick={() => movePage(noOfPages)}
            >
                <FiChevronsRight />
            </button>
        );

        return elements;
    }

    return (
        <>
            <ShowTable
                data={getPaginationData(pageSelected)}
                deleteAllSelectedEntries={deleteAllSelectedEntries}
                deleteSelectedEntry={deleteSelectedEntry}
                editSelectedEntry={editSelectedEntry}
            />
            <div className="makeContentCenter">
                {setPages()}
            </div>

        </>
    )
}

export default Pagination;