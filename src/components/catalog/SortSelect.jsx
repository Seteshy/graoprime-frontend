const OPTIONS = [
    {value: 'name-asc', label: 'Nome: A -> Z'},
    {value: 'name-desc', label: 'Nome: Z -> A'},
    {value: 'price-asc', label: 'Preço: menor primeiro'},
    {value: 'price-desc', label: 'Preço: maior primeiro'},
];

export default function SortSelect({value, onChange}) {
    return(
        <div>
            <label>Ordenar por:</label>
            <select 
                value={value} 
                onChange={e => onChange(e.target.value)} 
            >
                {OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}