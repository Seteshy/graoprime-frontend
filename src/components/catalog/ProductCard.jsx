import { useNavigate } from "react-router-dom";

export default function ProductCard({product}) {
    const navigate = useNavigate();

    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);

    return (
    <div 
        onClick={() => navigate(`/produto/${product.id}`)}>
            <div>
                <img src={product.image} alt={product.name}/>
            </div>
            <div>
                <h3>{product.name}</h3>
                <span>{formatted}</span>
            </div>
    </div>
    );
}
