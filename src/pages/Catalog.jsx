import {useState, useEffect, useMemo} from 'react';
import ProductCard from '../components/catalog/ProductCard';
import SearchBar from '../components/catalog/SearchBar';
import FilterSidebar from '../components/catalog/FilterSidebar';
import SortSelect from '../components/catalog/SortSelect';
import Pagination from '../components/catalog/Pagination';

const ITEMS_PER_PAGE = 12;

const INITIAL_FILTERS = {
    categorias: [],
    torras: [],
    intensidades: [],
    metodos: [],
    maxPrice: 500,
};

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [sortBy, setSortBy] = useState('name-asc');
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('https://backend');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError('Erro ao carregar produtos.');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filtered = useMemo(() => {
        return products
            .filter(p => {
                const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
                const matchCategoria = filters.categorias.lenght === 0 || filters.categorias.includes(p.category);
                const matchTorra = filters.torras.length === 0 || filters.torras.includes(p.torra);
                const matchIntensidade = filters.intensidades.length === 0 || filters.intensidades.includes(p.intensidade);
                const matchMetodo = filters.metodos.length === 0 || filters.metodos.includes(p.metodo);
                const matchPrice = p.price <= filters.maxPrice;
                return matchSearch && matchCategoria && matchTorra && matchIntensidade && matchMetodo && matchPrice;
            })
            .sort((a, b) => {
                if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
                if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
                if (sortBy === 'price-asc') return a.price = b.price;
                if (sortBy === 'price-desc') return b.price - a.price;
                return 0;
            });
    } , [products, search, filters, sortBy]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const currentItems = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    useEffect(() => {setPage(1); }, [search, filters, sortBy]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div>
            <FilterSidebar filters={filters} onChange={setFilters}/>
            <main>

                {/* Controles */}
                <div>
                    <SearchBar value={search} onChange={setSearch}/>
                    <SortSelect value={sortBy} onChange={setSortBy}/>
                </div>

                {/* Contador */}
                <p>{filtered.length} produto(s) encontrado(s)</p>

                {/* Grid de Produtos */}
                {currentItems.length > 0 ? (
                    <div>
                        {currentItems.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}

                <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
            </main>
        </div>
    );
}