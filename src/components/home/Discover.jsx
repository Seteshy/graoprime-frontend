import {Link} from 'react-router-dom'

export default function Discover(){
    return(
        <div>
            <div>
                <img/>
            </div>
            <div>
                <h2>Está em dúvida do que procura?</h2>
                <p>Então veio ao lugar certo! Separamos esta sessão para dedicar nossa atenção para encontrar o café ideal para o seu perfil, às vezes tudo o que você precisa é descobrir o seu match. Está pronto para embarcar nessa jornada? Clique no botão abaixo para descobrir</p>
                <div>
                    <Link to='/questionario'>
                        Match
                    </Link>
                </div>
            </div>
        </div>
    )
}