import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/catalogo', label: 'Catalog' },
  { to: '/carrinho', label: 'Cart' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
  { to: '/registrar', label: 'Register' },
  { to: '/quiz', label: 'Quiz' }
]

export default function Navbar() {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}