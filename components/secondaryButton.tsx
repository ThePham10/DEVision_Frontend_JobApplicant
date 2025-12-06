export default function SecondaryButton({ text, onClick, style }: { text: string; onClick: any; style?: string }) {
    return (
        <button
            className={`bg-white border border-solid border-[#e1e7ef] hover:border-[#2463eb] hover:text-[#2463eb] text-[#0f1729] px-6 py-3 rounded-md ${style}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}