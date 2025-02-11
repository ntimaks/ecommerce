import Arrow from "../../public/icons/arrow"


export default function ArrowButton() {
    return (
        <button className="w-10 h-10 nav-text-shadow rounded-full bg-smoke/50 text-black font-medium transition-colors border border-[#DEDBD5] flex items-center justify-center">
            <Arrow size={20} className="nav-text-shadow" color="#DEDBD5" />
        </button>
    )
}