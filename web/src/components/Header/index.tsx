import React from 'react';

//interface: definir a tipagem de um objeto, ou de qualquer outra coisa
interface HeaderProps {
    //:? = não é obrigatório 
    title:string;
}

//React.FC = tipo componente escrito em formato de função que pode receber parâmetro
const Header:React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;