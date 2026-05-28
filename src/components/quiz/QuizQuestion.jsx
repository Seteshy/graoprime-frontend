import QuizOption from "./QuizOption";

export default function QuizQuestion({pergunta, opcoes, tipo, onResposta}) {
    return(
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#3d1f0a] text-center">{pergunta}</h2>
            <div className={`grid gap-3 ${tipo === 'escala' ? 'grid-cols-5' : 'grid-cols-2'}`}>
                {opcoes.map(opcao => (
                    <QuizOption 
                        key={opcao.label} 
                        label={opcao.label} 
                        tipo={tipo} 
                        onClick={() => onResposta(opcao.valor)}
                    />
                ))}
            </div>
        </div>
    );
}