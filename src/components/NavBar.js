'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const pathName = usePathname();

    function cssHandler(path) {
        if (pathName === path) {
            return "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
        } else {
            return "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
        }
    }
    
    return (
        <ul class="flex border-b mb-10">
            <li class="-mb-px mr-1">
                <Link class={cssHandler("/")} href="/">Home</Link>
            </li>
            <li class="mr-1">
                <Link class={cssHandler("/pools")} href="/pools">Pool Search</Link>
            </li>
            <li class="mr-1">
                <Link class={cssHandler("/python")} href="/python">Python Script</Link>
            </li>
        </ul>
    )
}