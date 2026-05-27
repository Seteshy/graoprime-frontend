import { useState, useEffect } from "react";
import BestSellerItem from "./BestSellerItem";

export default function BestSellerList(){
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function getCoffees(){
            try{
                const response = await fetch('https://backend');

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados');
                }

                const result = await response.json();
                setCoffees(result);

            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getCoffees();
    }, []);

    if (loading) return <p>Carregando dados...</p>;
    if (error) return <p>Erro: {error}</p>;

    return(
        <ul>
            {coffees.map((coffee) => (
                <BestSellerItem coffee={coffee} key={coffee.id}/>
            ))}
        </ul>
    );
}