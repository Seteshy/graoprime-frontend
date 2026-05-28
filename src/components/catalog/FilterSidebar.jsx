const CATEGORIAS = ['Espresso', 'Filtrado', 'Cápsula', 'Grão', 'Moído'];
const TORRAS = ['Clara', 'Média', 'Escura', 'Extra Escura'];
const INTENSIDADES = ['Suave', 'Médio', 'Intenso', 'Extra Forte'];
const METODOS = ['Espresso', 'Aeropress', 'Chemex', 'V60', 'Prensa Francesa', 'Moka'];

export default function FilterSidebar({filters, onChange}) {

    function handleCheckbox(field, value) {
        const current = filters[field]; // é um array
        const updated = current.includes(value)
            ? current.filter(v => v !== value) // remove se já estava
            : [...current, value];
        onChange({ ...filters, [field]: updated });
    }

    function handlePrice(e) {
        onChange({ ...filters, maxPrice: Number(e.target.value)});
    }

    function handleClear(){
        onChange({
            categorias: [],
            torras: [],
            intensidades: [],
            metodos: [],
            maxPrice: 500,
        });
    }

    return(
        <aside>
            <div>
                <h2>Filtros</h2>
                <button>Limpar Tudo</button>
            </div>

            {/* Categoria */}
            <FilterGroup
                title='Categoria'
                options={CATEGORIAS}
                selected={filters.categorias}
                onChange={(val) => handleCheckbox('categorias', val)}
            />

            {/* Torra */}
            <FilterGroup
                title='Torra'
                options={TORRAS}
                selected={filters.torras}
                onChange={(val) => handleCheckbox('torras', val)}
            />

            {/* Intensidade */}
            <FilterGroup
                title='Intensidade'
                options={INTENSIDADES}
                selected={filters.intensidades}
                onChange={(val) => handleCheckbox('intensidades', val)}
            />

            {/* Método de preparo */}
            <FilterGroup
                title='Método de Preparo'
                options={METODOS}
                selected={filters.metodos}
                onChange={(val) => handleCheckbox('metodos', val)}
            />

            {/* Faixa de preço */}
            <div>
                <h3>Faixa de Preço</h3>
                <div>
                    <span>R$ 0</span>
                    <span>até R$ {filters.maxPrice}</span>
                </div>
                <input 
                    type='range' 
                    min={0} 
                    max={500}
                    step={10} 
                    value={filters.maxPrice} 
                    onChange={handlePrice} 
                    />
            </div>
        </aside>
    )
}

function FilterGroup({title, options, selected, onChange}) {
    return(
        <div>
            <h3>{title}</h3>
            {options.map(option => (
                <label key={option}>
                    <input 
                        type="cheackbox" 
                        checked={selected.includes(option)} 
                        onChange={() => onChange(option)}
                        />
                    {option}
                </label>
            ))}
        </div>
    );
}