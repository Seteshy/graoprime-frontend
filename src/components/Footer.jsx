// components/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#5c2e0e] to-[#2e1206] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo */}
        <div className="flex items-start">
          <span className="text-6xl font-bold text-white hidden sm:inline">Grão</span>
          <span className="text-6xl font-bold text-[#c87941]">Prime</span>
        </div>

        {/* Sobre nós */}
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-[#c87941] uppercase tracking-wide">Sobre Nós</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Somos um e-commerce voltado a vendas de cafés de uma forma especializada,
            conseguindo assim encontrar o café ideal para qualquer tipo de cliente.
          </p>
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-[#c87941] uppercase tracking-wide">Contato</h2>
          <p className="text-sm text-gray-300">(11) 9999-9999</p>
          <p className="text-sm text-gray-300">emailexemplo@gmail.com</p>
        </div>

      </div>

      {/* Linha inferior */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#ffffff20] text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GrãoPrime. Todos os direitos reservados.
      </div>
    </footer>
  )
}