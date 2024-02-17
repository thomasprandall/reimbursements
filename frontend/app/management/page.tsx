"use client"
// This page is basically just a copy of /requests but I was running out of time
// So I redirected to implement some tests rather than flesh out this to completion
import React, { useState } from "react"
import useData from "../_lib/useData"

import DataTable from "../_components/DataTable"
import DataTableRow from "../_components/DataTableRow"

export default function Page(){
    const {status, data} = useData("http://127.0.0.1:5000/requests")

    const expectedColumns = [
        { key: "trans_date", title: "Date" },
        { key: "reason", title: "Description" },
        { key: "account", title: "Bank Account" },
        { key: "amount", title: "Amount" },
        { key: "status", title: "Status" },
    ];

    return (
        <>
            <h1 className="text-3xl">Requests</h1>
            { status !== 'fetched' ? <h2>Loading Requests...</h2>:
                <DataTable>
                    <DataTableRow cells={expectedColumns.map((col) => col.title)} />
                    {
                        data.map((row) => (
                            <DataTableRow key={Math.random()} cells={row} cols={expectedColumns} />
                        ))
                    }
                </DataTable>}
        </>
    )
}