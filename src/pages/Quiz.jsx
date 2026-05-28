import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizProgress from "../components/quiz/QuizProgress";
import QuizQuestion from "../components/quiz/QuizQuestion";

const PERGUNTAS = [
    {
        id: 'metodo',
        pergunta: 'Como você costuma preparar seu café?',
        tipo: 'texto',
        opcoes: [
            {label: 'Cafeteira elétrica', valor: 'Cafeteira elétrica'},
            {label: 'Espresso', valor: 'Espresso'},
            {label: 'Coador', valor: 'Coador'},
            {label: 'Cápsula', valor: 'Cápsula'},
            {label: 'French Press', valor: 'French Press'},
            {label: 'Ainda não sei', valor: null},
        ],
    },
    {
        id: 'torra',
        pergunta: 'Você prefere cafés mais claros ou mais escuros?',
        tipo: 'escala',
        opcoes: [
            {label: 'Bem Claro', valor: 1},
            {label: 'Claro', valor: 2},
            {label: 'Médio', valor: 3},
            {label: 'Escuro', valor: 4},
            {label: 'Bem Escuro', valor: 5},
        ],
    },
    {
        id: 'intensidade',
        pergunta: 'Como você gosta do seu café?',
        tipo: 'escala',
        opcoes: [
            {label: 'Bem leve', valor: 1},
            {label: 'Suave', valor: 2},
            {label: 'Equilibrado', valor: 3},
            {label: 'Encorpado', valor: 4},
            {label: 'Muito Forte', valor: 5},
        ],
    },
    {
        id: 'acidez',
        pergunta: 'Você curte aquele toque frutado/cítrico no café?',
        tipo: 'escala',
        opcoes: [
            {label: 'Não gosto nada', valor: 1},
            {label: 'Prefiro pouco', valor: 2},
            {label: 'Indiferente', valor: 3},
            {label: 'Gosto', valor: 4},
            {label: 'Adoro', valor: 5},
        ],
    },
    {
        id: 'amargor',
        pergunta: 'Como você se relaciona com o amargor?',
        tipo: 'escala',
        opcoes: [
            {label: 'Não suporto', valor: 1},
            {label: 'Prefiro pouco', valor: 2},
            {label: 'No ponto', valor: 3},
            {label: 'Gosto', valor: 4},
            {label: 'Quanto mais amargo, melhor', valor: 5},
        ],
    },
    {
        id: 'docura',
        pergunta: 'Você prefere cafés com notas mais adocicadas?',
        tipo: 'escala',
        opcoes: [
            {label: 'Prefiro nada doce', valor: 1},
            {label: 'Um toque só', valor: 2},
            {label: 'Equilibrado', valor: 3},
            {label: 'Bem adocicado', valor: 4},
            {label: 'Muito adocicado', valor: 5},
        ],
    },
    //TALVEZ ADICIONAR ESSES
    /*
    {
        id: 'comLeite',
        pergunta: 'Você toma café com leite?',
        tipo: 'texto',
        opcoes: [
            {label: 'Sempre', valor: 'Sempre'},
            {label: 'Às vezes', valor: 'Às vezes'},
            {label: 'Nunca', valor: 'Nunca'},
        ],
    },
    {
        id: 'momento',
        pergunta: 'Quando você mais toma café?',
        tipo: 'texto',
        opcoes: [
            {label: 'De manhã para acordar', valor: 'De manhã para acordar'},
            {label: 'Durante o trabalho', valor: 'Durante o trabalho'},
            {label: 'À tarde', valor: 'À tarde'},
            {label: 'Após refeições', valor: 'Após refeições'},
            {label: 'O dia todo', valor: 'O dia todo'},
        ],
    },
    */
];

export default function Quiz(){
    const navigate = useNavigate();
    const [indice, setIndice] = useState(0);
    const [respostas, setRespostas] = useState({});
    const [loading, setLoading] = useState(false);

    const perguntaAtual = PERGUNTAS[indice];
    const isUltima = indice === PERGUNTAS.length - 1;

    async function handleResposta(valor) {
        const novasRespostas = {...respostas, [perguntaAtual.id]: valor};
        setRespostas(novasRespostas);

        if (!isUltima) {
            setIndice(prev => prev + 1);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://api.anthopic.com/v1/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [
                        {
                            role: 'user',
                            content: `Você é um especialista em cafés. Com base no perfil abaixo, indique o café ideal.
                            
Perfil do usuário:
${JSON.stringify(novasRespostas, null, 2)}

Responda APENAS em JSON válido, sem texto extra, sem markdown, no seguinte formato:
{
    "nome": "Nome do café ideal",
    "descricao": "Por que esse café combina com o perfil",
    "torra": número de 1 a 5,
    "intensidade": número de 1 a 5,
    "acidez": número de 1 a 5,
    "amargor": número de 1 a 5,
    "docura": número de 1 a 5,
    "metodo": "Método de preparo recomendado",
    "dica": "Uma dica especial de preparo"
}`
                        }
                    ]
                })
            });

            const data = await response.json();
            const texto = data.content.map(i => i.text || '').join('');
            const result = JSON.parse(texto);


            navigate('/quiz/resultado', {state: {result, respostas: novasRespostas}});

        } catch (err) {
            console.error('Erro ao consultar IA:', err);
            alert('Erro ao processar suas respostas. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    function handleVoltar(){
        if (indice > 0) setIndice(prev => prev - 1);
    }

    if (loading) {
        return(
            <div className="min-h-screen bg-[#f0dfc0] flex flex-col items-center justify-center gap-4">
                <p className="text-2xl font-bold text-[#3d1f0a]">Calculando seu café ideal...</p>
                <p className="text-sm text-[#7a4a2a]">A IA está analisando seu perfil</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#f0dfc0] flex flex-col items-center justify-center px-6 py-10">
            <div className="w-full max-w-xl flex flex-col gap-8">

                <QuizProgress atual={indice + 1} total={PERGUNTAS.length}/>

                <QuizQuestion 
                    pergunta={perguntaAtual.pergunta} 
                    opcoes={perguntaAtual.opcoes} 
                    tipo={perguntaAtual.tipo} 
                    onResposta={handleResposta}
                />

                {indice > 0 && (
                    <button 
                        onClick={handleVoltar} 
                        className="text-sm text-[#7a4a2a] hover:text-[#3d1f0a] transition-colors text-center"
                    >
                        ← Voltar
                    </button>
                )}
            </div>
        </div>
    );
}