import Image from "next/image"
import Link from "next/link"
import { SearchInput } from "./search-input"

export const HomeNavbar = () => {
    return (
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex gap-3 items-center shrink-0 pr-6">
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt="Logo" height={36} width={36} />
                </Link>
                <h3 className="text-xl">Dox</h3>
            </div>
            <SearchInput />
            <div />
        </nav>
    )
}