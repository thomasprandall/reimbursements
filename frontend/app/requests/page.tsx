"use client"

import React, { useRef, useState } from "react"
// implementing a custom hook for the api fetch but would likely use something like RTK Query or something in a shared codebase
import useData from "../_lib/useData"

import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { FormEvent } from "react"

import DataTable from "../_components/DataTable"
import DataTableRow from "../_components/DataTableRow"
import Dialog from "../_components/Dialog"
import { randomUUID } from "crypto"

export default function Page(){
    // fetch our requests with custom hook
    const {status, data} = useData("http://127.0.0.1:5000/requests")

    // Mapping column names to display names, we use this for column ordering as well
    const expectedColumns = [
        { key: "trans_date", title: "Date" },
        { key: "reason", title: "Description" },
        { key: "account", title: "Bank Account" },
        { key: "amount", title: "Amount" },
        { key: "status", title: "Status" },
    ];

    const searchParams = useSearchParams()
    // A modal component that we show if a URL parameter exists, this lets us link to the add page from elsewhere
    const [showModal, setShowModal] = useState(searchParams.get('showAddRequestModal')?.length ? true:false)

    // I don't really care if the form fields change until they are submitted so I use useRef instead of state here
    const reasonRef = useRef<HTMLInputElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const transDateRef = useRef<HTMLInputElement | null>(null) // some type weirdness here with useRef and HTMLInputElement because it is null but then becomes a MutableObject

    // I handle the add submit as a real form submission to support validation and keyboard use/accessibility
    // Worth considering doing this a different way for a real project
    const handleFormSubmit = async function(e: FormEvent): Promise<void>{
        e.preventDefault()

        // build request data from form field values in useRef, would improve this to make sure we aren't submitting blank values
        const request = {
            reason: reasonRef.current?.value,
            amount: amountRef.current?.value,
            trans_date: transDateRef.current?.value
        }

        // post our form data to the add api endpoint
        const res = await fetch('http://127.0.0.1:5000/request/add', {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "no-cors" // more security hacking to let this work in a local environment, not how we should do it in prod
        })

        setShowModal(false)
    }

    return (
        <>
            <h1 className="text-3xl">Requests</h1>
            <Link href="/requests?showAddRequestModal=1" className="bg-blue-700 text-white p-2 rounded border-none basis-2/5 my-4">Submit new request</Link>
            { status !== 'fetched' ? <h2>Loading Requests...</h2>:
                // I implement a custom data table, I'd explore libraries to do this better and support pagination/lazy loading easier for lots of data
                <DataTable>
                    {/* Pass my header row, unsortable for not but would implement sorting for MVP */}
                    <DataTableRow cells={expectedColumns.map((col) => col.title)} />
                    {
                        // map my data rows to table rows
                        data.map((row) => (
                            <DataTableRow key={Math.random()} cells={row} cols={expectedColumns} /> // i'd use a real key, trust me but this makes the red squiggles go away faster
                        ))
                    }
                </DataTable>
            }

            {/* A custom dialog/modal component that loads our Add form */}
            <Dialog section="Requests" title="Add" showDialog={showModal}>
                <form id="modal-form" onSubmit={handleFormSubmit}>
                    <div className="py-2 my-2 flex flex-row flex-wrap gap-2 border-b-2 justify-between leading-relaxed">
                        <label htmlFor="reason">Reason</label>
                        <input type="text" name="reason" id="reason" ref={reasonRef} required  />
                    </div>
                    <div className="py-2 my-2 flex flex-row flex-wrap gap-2 border-b-2 justify-between">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" name="amount" id="amount" ref={amountRef} required  />
                    </div>
                    <div className="py-2 my-2 flex flex-row flex-wrap gap-2 border-b-2 justify-between">
                        <label htmlFor="trans_date">Transaction Date</label>
                        <input type="date" name="trans_date" id="trans_date" ref={transDateRef} required  />
                    </div>
                </form>
            </Dialog>
        </>
    )
}