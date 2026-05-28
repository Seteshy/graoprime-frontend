import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CARACTERISTICAS = ['torra', 'intensidade', 'acidez', 'amargor', 'docura'];
const LABELS = {
    torra: 'Torra',
    intensidade: 'Intensidade',
    acidez: 'Acidez',
    amargor: 'Amargor',
    docura: 'Doçura',
};

export default function QuizResult(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const {result} = state || {};

    const [similares, setSimilares] = useState([]);
    const [loadingSimilares, setLoadingSimilares] = useState(true);

    useEffect(() => {
        if (!result?.outrosCompativeis?.length) return;

        async function fetchSimilares(){
            try {
                const promises = result.outrosCompativeis.map(nome => 
                    fetch(`https://sua-api.com/products?search=${encodeURIComponent(nome)}`)
                    .then(r => js.json())
                    .then(data => data[0] ?? null) //para pegar o primeiro resultado
                );
                const results = await Promise.all(promises);
                setSimilares(results.filter(Boolean)); //remove nulos
            } catch (err) {
                console.error('Erro ao buscar similares: ', err);
            } finally {
                setLoadingSimilares(false);
            }
        }
        fetchSimilares();
    }, [result]);

    if (!result){
        return(
            <div className="min-h-screen bg-[#f0dfc0] flex items-center justify-center">
                <p className="text-[#3d1f0a]">Nenhum resultado encontrado. <button onClick={() => navigate("/quiz")} className="underline">Refazer questionário</button></p>
            </div>
        );
    }

    const formatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

    return (
        <div className="min-h-screen bg-[#f0dfc0] px-6 py-10 flex flex-col items-center gap-10">

            {/* Cabeçalho */}
            <div className="text-center flex flex-col gap-1">
                <span className="text-sm text-[#7a4a2a] uppercase tracking-widest">Recomendação personalizada</span>
                <h1 className="text-4xl font-bold text-[#3d1f0a]">Encontramos seu café ideal</h1>
            </div>

            {/* Card principal */}
            <div className="w-full max-w-2xl bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] rounded-3xl p-8 text-white flex flex-col gap-6 shadow-2xl">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Imagem + nome + compatibilidade */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="w-48 h-56 bg-gray-300 rounded-2xl overflow-hidden">
                        {result.image
                            ? <img src={result.image} alt={result.nome} className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-gray-300" />
                        }
                        </div>
                        <h2 className="text-lg font-bold text-center">{result.nome}</h2>
                        <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#c87941]">{result.compatibilidade}%</span>
                        <span className="text-xs text-gray-300">compatibilidade</span>
                        </div>
                    </div>

                    {/* Descrição + notas + características */}
                    <div className="flex flex-col gap-5 flex-1">

                        <div>
                            <h3 className="text-base font-bold text-[#c87941] mb-1">Descrição do porquê da escolha</h3>
                            <p className="text-sm text-gray-200 leading-relaxed">{result.descricao}</p>
                        </div>

                        {result.notasDeSabor && (
                        <div>
                            <h3 className="text-sm font-bold text-[#c87941] mb-1">Notas de sabor</h3>
                            <p className="text-sm text-gray-300">{result.notasDeSabor}</p>
                        </div>
                        )}

                        <div>
                            <h3 className="text-sm font-bold text-[#c87941] mb-3">Características</h3>
                            <div className="flex gap-3">
                                {CARACTERISTICAS.map(key => (
                                <NivelBarra key={key} label={LABELS[key]} valor={result[key]} max={5} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Dica de preparo */}
                {result.dica && (
                    <p className="text-xs text-gray-300 border-t border-[#ffffff20] pt-4 italic">
                        💡 {result.dica}
                    </p>
                )}

                {/* Botões */}
                <div className="flex gap-4">
                    <button className="flex-1 bg-[#c87941] text-white font-bold py-3 rounded-xl hover:bg-[#a85e2a] transition-colors">
                        Adicionar ao carrinho
                    </button>
                    <button
                        onClick={() => navigate(`/produto/${result.nome}`)} // 👈 ajuste se o id vier da API
                        className="px-6 bg-[#ffffff15] text-white font-bold py-3 rounded-xl hover:bg-[#ffffff25] transition-colors"
                    >
                        Detalhes
                    </button>
                </div>

            </div>

            {/* Outros cafés compatíveis */}
            <div className="w-full max-w-2xl flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#3d1f0a]">Outros cafés compatíveis</h2>

                {loadingSimilares ? (
                    <p className="text-sm text-[#7a4a2a]">Buscando cafés compatíveis...</p>
                    ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {similares.map(cafe => (
                        <div
                            key={cafe.id}
                            onClick={() => navigate(`/produto/${cafe.id}`)}
                            className="bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] rounded-2xl p-3
                                    flex flex-col items-center gap-2 cursor-pointer text-white
                                    hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                            <div className="w-full aspect-square bg-gray-300 rounded-xl overflow-hidden">
                                {cafe.image
                                    ? <img src={cafe.image} alt={cafe.name} className="w-full h-full object-cover" />
                                    : <div className="w-full h-full bg-gray-300" />
                                }
                            </div>
                            <p className="text-xs font-semibold text-center">{cafe.name}</p>
                            <span className="text-xs text-[#c87941] font-bold">
                                {formatted.format(cafe.price)}
                            </span>
                        </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Refazer questionário */}
            <button
                onClick={() => navigate("/quiz")}
                className="px-8 py-3 border-2 border-[#5c2e0e] text-[#3d1f0a] font-bold rounded-xl
                        hover:bg-[#5c2e0e] hover:text-white transition-all"
            >
                Refazer questionário
            </button>

        </div>
    );
}

function NivelBarra({ label, valor, max }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-300 text-center">{label}</span>
            <div className="flex flex-col-reverse gap-1">
                {Array.from({ length: max }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-6 h-5 rounded-sm ${i < valor ? "bg-[#c87941]" : "bg-[#ffffff20]"}`}
                    />
                ))}
            </div>
        </div>
    );
}
