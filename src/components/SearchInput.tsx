"use client"

import * as React from "react"
import { ArrowRight } from 'lucide-react'

export default function SearchBar() {
    const [isFocused, setIsFocused] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="w-full bg-black p-8">
            <div className="relative w-full max-w-4xl mx-auto">
                <div
                    className={`flex items-center border-b ${isFocused ? "border-white" : "border-white/50"
                        } transition-all duration-300 ease-in-out group`}
                >
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search"
                        className="w-full py-4 bg-transparent text-white placeholder:text-white/50 outline-none text-lg"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <ArrowRight
                        className={`w-6 h-6 transition-all duration-300 ${value || isFocused ? "text-white translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                            }`}
                    />
                </div>
            </div>
        </div>
    )
}

