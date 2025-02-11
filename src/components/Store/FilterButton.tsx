import { ChevronDown } from "lucide-react";
import ArrowDown from "../../../public/icons/arrow_down";

export const FilterButton = ({ text }: { text: string }) => (
    <button className="bg-smoke/50 rounded-full border border-[#DEDBD5] text-[#DEDBD5] font-bold px-4 py-2 flex items-center justify-between w-40">
        {text}
        <ArrowDown className="w-4 h-4" />
    </button>
)