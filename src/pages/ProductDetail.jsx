import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MOCK_PRODUCT = {
    id: 1,
    name: 'Café Etiópia Yirgacheffe',
    image: null,
    price: 89.90,
    description: 'Um café de origem única com notas florais e frutadas, colhido nas montanhas da Etiópia. Processo natural que realça a doçura e complexidade da bebida',
    torra: 3,
    intensidade: 4,
    acidez: 5,
    amargor: 2,
    docura: 4,
};

const MOCK_SIMILARES = [
    {id: 2, name: 'Café Quênia AA', price: 79.90, image: null},
    {id: 3, name: 'Café Geisha Panamá', price: 129.90, image: null},
    {id: 4, name: 'Café Bourbon Amarelo', price: 69.90, image: null},
];

export default function ProductDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similares, setSimilares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSimilares, setShowSimilares] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                // Trocar pelo fetch real depois que tiver a API
                //const res = await fetch(`https://backend`)
                //const data = await res.json();
                setProduct(MOCK_PRODUCT);
                setSimilares(MOCK_SIMILARES);
            } catch (err) {
                setError('Produto não encontrado');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>;

    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);

    const caracteristicas = [
        {label: 'Torra', valor: product.torra},
        {label: 'Intensidade', valor: product.intensidade},
        {label: 'Acidez', valor: product.acidez},
        {label: 'Amargor', valor: product.amargor},
        {label: 'Doçura', valor: product.docura},
    ];

    return (
    <div className="min-h-screen bg-[#f0dfc0] px-6 py-10 flex flex-col items-center gap-8">

      {/* Card principal */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] 
                      rounded-3xl p-8 flex flex-col gap-6 shadow-2xl text-white relative">

        {/* Botão voltar */}
        <button
          onClick={() => navigate("/catalogo")}
          className="absolute top-6 left-6 bg-[#c87941] text-white text-sm font-bold 
                     px-4 py-2 rounded-full hover:bg-[#a85e2a] transition-colors"
        >
          voltar
        </button>

        {/* Conteúdo: imagem + descrição */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">

          {/* Imagem */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-52 h-64 bg-gray-300 rounded-2xl overflow-hidden">
              {product.image
                ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-gray-300" />
              }
            </div>
            <h2 className="text-xl font-bold text-center">{product.name}</h2>
            <span className="text-lg font-bold text-[#c87941]">{formatted}</span>
          </div>

          {/* Descrição + Características */}
          <div className="flex flex-col gap-6 flex-1">

            <div>
              <h3 className="text-xl font-bold mb-2 text-center">Descrição</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-center">Características</h3>
              <div className="flex justify-between gap-2">
                {caracteristicas.map(({ label, valor }) => (
                  <NivelBarra key={label} label={label} valor={valor} max={5} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => setShowSimilares(prev => !prev)}
            className="bg-[#c87941] text-white font-bold px-6 py-2 rounded-full 
                       hover:bg-[#a85e2a] transition-colors"
          >
            parecidos
          </button>
          <button
            className="bg-[#c87941] text-white font-bold px-6 py-2 rounded-full 
                       hover:bg-[#a85e2a] transition-colors"
          >
            carrinho
          </button>
        </div>

      </div>

      {/* Seção de similares */}
      {showSimilares && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[#3d1f0a] text-center">Produtos Parecidos</h3>
          <div className="grid grid-cols-3 gap-4">
            {similares.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/produto/${item.id}`)}
                className="bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] rounded-2xl 
                           p-4 flex flex-col items-center gap-2 cursor-pointer 
                           hover:-translate-y-1 hover:shadow-lg transition-all text-white"
              >
                <div className="w-full aspect-square bg-gray-300 rounded-xl overflow-hidden">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gray-300" />
                  }
                </div>
                <p className="text-sm font-semibold text-center">{item.name}</p>
                <span className="text-sm text-[#c87941] font-bold">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function NivelBarra({label, valor, max}) {
    return(
        <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-300 text-center">{label}</span>
            <div className="flex flex-col-reverse gap-1">
                {Array.from({length:max}).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-6 h-5 rounded-sm ${i < valor ? 
                            "bg-[#c87941]" : "bg-[#ffffff20]"}`}/>
                ))}
            </div>
        </div>
    );
}