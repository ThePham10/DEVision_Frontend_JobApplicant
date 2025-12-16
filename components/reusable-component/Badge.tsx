const Badge = ({ text }: { text: string }) => {
    return (
        <span className="inline-flex w-fit text-xs font-bold border-[#E1E7EF] border px-3 py-1 rounded-full">
            {text}
        </span>
    );
};

export default Badge