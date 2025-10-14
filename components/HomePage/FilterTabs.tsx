'use client';

type FilterType = 'Tất cả' | 'Xe Điện' | 'Pin Xe Điện';

export default function FilterTabs({ selected, onChange }: {
    selected: FilterType;
    onChange: (filter: FilterType) => void;
}) {
    const tabs: FilterType[] = ['Tất cả', 'Xe Điện', 'Pin Xe Điện'];

    return (
        <div className="flex gap-3 mb-6 flex-wrap">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`filter-tab px-6 py-3 rounded-full text-sm font-semibold shadow-md ${
                        selected === tab
                            ? 'filter-tab-active bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
