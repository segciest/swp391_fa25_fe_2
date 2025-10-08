'use client';

type FilterType = 'Tất cả' | 'Xe Điện' | 'Pin Xe Điện';

export default function FilterTabs({ selected, onChange }: {
    selected: FilterType;
    onChange: (filter: FilterType) => void;
}) {
    const tabs: FilterType[] = ['Tất cả', 'Xe Điện', 'Pin Xe Điện'];

    return (
        <div className="flex gap-2 mb-4">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${selected === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
