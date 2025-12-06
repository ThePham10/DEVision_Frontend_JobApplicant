export default function Button({ text, onClick, style}: { text: string; onClick: any; style? : string}) {
    return (
        <button
            className={`bg-[#2463eb] hover:bg-[#2362ebe6] text-white px-6 py-3 rounded-md ${style}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}