export default function Input({title, placeholder, type}: {title: string; placeholder: string; type: string;}) {
    return (
        <div className="mb-4">
            <label className="block font-[Inter] text-[#0F1729] mb-2" htmlFor={title}>
                {title}
            </label>
            <input
                className="border border-[#E1E7EF] rounded w-full py-2 px-3 text-gray-700 leading-tight h-[40px]"
                id={title}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}