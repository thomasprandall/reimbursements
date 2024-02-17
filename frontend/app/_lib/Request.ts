export type Request = {
    date: Date,
    description: string,
    account: string,
    amount: string,
    status: "Pending"|"Approved"|"Denied",
    id: number
}