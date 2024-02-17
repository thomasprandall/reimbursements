"use client"

import { useRef, useEffect } from 'react'

type Props = {
    section: string,
    title: string,
    children: React.ReactNode,
    showDialog: boolean,
}

export default function Dialog({ section, title, children, showDialog }: Props) {
    const dialogRef = useRef<null | HTMLDialogElement>(null) // more useRef type shenanigans

    useEffect(() => {
        if (showDialog) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const dialog: JSX.Element | null = showDialog
        ? (
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5">
                        <div>
                            <h1 className="lowercase text-slate-300">{section}</h1>
                            <h1 className="text-2xl">{title}</h1>
                        </div>
                        <button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold"
                        >x</button>
                    </div>
                    <div className="px-5 pb-6">
                        {children}
                        <div className="flex flex-row justify-between mt-8">
                            <button onClick={closeDialog} className="p-2 rounded border-none basis-2/5">
                                Cancel
                            </button>
                            <button form='modal-form' content='Submit' onClick={closeDialog} className="bg-blue-700 text-white p-2 rounded border-none basis-2/5">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        ) : null


    return dialog
}