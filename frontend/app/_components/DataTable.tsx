import { Request } from "../_lib/Request"
import { ReactNode } from "react";

interface DataProps {
    cols: [{key: string}],
    data: Request[],
}

export default function DataTable({children}: {children: ReactNode}){
    return (
        <div className="block md:table w-full">
            { children }
        </div>
    )
}