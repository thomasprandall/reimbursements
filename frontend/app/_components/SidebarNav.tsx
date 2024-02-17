import Link from "next/link";
import { ReactNode } from "react";

type NavLink = {
    name: "Requests",
    url: "/requests",
    icon: ReactNode
}

export default function SidebarNav({links}: {links: NavLink[]}){
    return (
        <div className="">
            <ul>
                {
                    links.map((link: NavLink) => <li key={link.name.toLowerCase()} className="text-xl mb-4 last:mb-0 flex flex-row gap-2 items-center">{link.icon}<Link href={link.url}>{link.name}</Link></li>)
                }
            </ul>
        </div>
    )
}