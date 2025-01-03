'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParam } from "@/hooks/use-search-param"
import { SearchIcon, XIcon } from "lucide-react"
import React, { useRef, useState } from "react"

// Time Stamp: 05:01:00

export const SearchInput = () => {
    const [search, setSearch] = useSearchParam();
    const [value, setValue] = useState(search);

    const inputref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleClear = () => {
        setValue('');
        setSearch('');
        inputref.current?.blur();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputref.current?.blur();
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative max-w-[720px] w-full" >
                <Input
                    value={value}
                    onChange={handleChange}
                    ref={inputref}
                    placeholder="Search"
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_3px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white" />
                <Button
                    type="submit"
                    variant='ghost'
                    size='icon'
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <SearchIcon />
                </Button>
                {value && (
                    <Button
                        onClick={handleClear}
                        type="button"
                        variant='ghost'
                        size='icon'
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                    >
                        <XIcon />
                    </Button>
                )}
            </form>
        </div>
    )
}