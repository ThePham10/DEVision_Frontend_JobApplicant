export default function ServiceCard({ title, description, icon }: { title: string; description: string; icon: string }) {
    return (
        <div className="flex flex-col flex-wrap gap-4 justify-center w-[400px] font-[Inter] rounded-[8px] border-[#e1e7ef] border p-6 bg-[#FFF]">
            <div className="flex items-end text-center gap-5">
                <img src={icon} alt={`${title} icon`} className="w-16 h-16 mb-4" />
                <div className="flex justify-center text-2xl font-bold">{title}</div>
            </div>
            <div className="flex text-[#65758b] text-justify">
                {description}
            </div>
        </div>
    );
}