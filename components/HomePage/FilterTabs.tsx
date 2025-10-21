'use client';

// QUAN TRỌNG: Đảm bảo có dòng import này ở đầu file
import './FilterTabs.css'; 

type FilterType = 'Tất cả' | 'Xe Điện' | 'Pin Xe Điện';

export default function FilterTabs({ selected, onChange }: {
    selected: FilterType;
    onChange: (filter: FilterType) => void;
}) {
    const tabs: FilterType[] = ['Tất cả', 'Xe Điện', 'Pin Xe Điện'];

    return (
        <div className="filter-tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`filter-tab ${selected === tab ? 'is-active' : ''}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}