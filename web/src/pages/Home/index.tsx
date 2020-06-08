import React from 'react';
import logo from '../../assets/logo.svg'
import './home.css';
import { FiLogIn} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/> 
                    <div className="cadastro">
                        <Link to="create-point">
                        <span>Cadastre um ponto de coleta</span><FiLogIn color="#2FB86E"/>
                        </Link>
                    </div>
                    
                    </header>
           
            <main>
                <h1>Seu marketplace de coleta de resíduos</h1>
                <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                <Link to="/points">
                    <span>
                        <FiLogIn/>
                    </span>
                    <strong>Veja todos os pontos de coleta</strong>
                </Link>
            </main>
            </div>
        </div>
    )
}

export default Home;