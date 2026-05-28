export default function QuizProgress({atual, total}) {
    const porcentagem = (atual/total) * 100;

    return(
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-[#7a4a2a]">
                <span>Pergunta {atual} de {total}</span>
                <span>{Math.round(porcentagem)}%</span>
            </div>
            <div className="w-full h-2 bg-[#d4b896] rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#c87941] rounded-full transition-all duration-500" 
                    style={{width: `${porcentagem}%`}}
                />
            </div>
        </div>
    );
}