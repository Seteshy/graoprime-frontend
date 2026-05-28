export default function QuizOption({label, tipo, onClick}) {
    return(
        <button 
            onClick={onClick} 
            className={`
                bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] text-white font-medium 
                rounded-2xl transition-all duration-200 
                hover:scale-105 hover:shadow-lg hover:from-[#c87941] hover:to-[#a85e2a] 
                active:scale-95 
                ${tipo === 'escala' ? 'py-6 text-xs text-center' : 'py-4 px-4 text-sm text-center'}
            `}
        >
            {label}
        </button>
    );
}