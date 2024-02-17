type CellData = string | number;

export default function DataTableRow({cells, cols}: {cells: CellData[], cols?:any[]}){
    return (
        <div className="block md:table-row even:bg-blue-50 hover:bg-yellow-50">
            {/* This ended up hacked together a bit when I changed from all string columns to string/number, I'd revisit this with more time */}
            {
                cols &&
                    cols.map((col) => <div key={cells[col.id]} className="md:table-cell py-4 px-2">{cells[col.key]}</div>)
            }
            {
                !cols &&
                    cells.map((cell) => <div key={typeof cell == 'string' ? cell.toLowerCase():cell} className="md:table-cell py-4 px-2 font-bold">{cell}</div>)
            }
        </div>
    )
}