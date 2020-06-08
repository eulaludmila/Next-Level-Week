import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import './modal.css'
import { FiLogIn } from 'react-icons/fi';

interface Props {
    dados: (uf:string, city:string) => void;
}


interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}


const ModalPoints: React.FC<Props> = ({dados}) => {

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {

        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const ufInitials = res.data.map(uf => uf.sigla)

            setUfs(ufInitials);

        });


    }, [])


    useEffect(() => {
        //carregar as cidades sempre que a uf mudar
        if (selectedUf === '') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(res => {

                const cityNames = res.data.map(city => city.nome)

                setCities(cityNames);
            });

    }, [selectedUf])




    function handleSelectedUf(e: ChangeEvent<HTMLSelectElement>) {
        const uf = e.target.value;
        setSelectedUf(uf);
    }
    function handleSelectedCity(e: ChangeEvent<HTMLSelectElement>) {
        const city = e.target.value;
        setSelectedCity(city);
    }

    function handleBusca(){

       dados(selectedUf, selectedCity);
    }


    return (
        <div id="modal">
            <div className="busca">
                <h3>Selecione estado e cidade para a busca:</h3>
                <select value={selectedUf} onChange={(e) => handleSelectedUf(e)}>
                    <option>Selecione a UF</option>
                    {
                        ufs.map(sigla => (
                            <option key={sigla} value={sigla}>{sigla}</option>
                        ))
                    }
                </select>
                <select value={selectedCity} onChange={(e) => handleSelectedCity(e)}>
                    <option>Selecione a cidade</option>
                    {
                        cities.map(nome => (
                            <option key={nome} value={nome}>{nome}</option>
                        ))
                    }
                </select>
                <div className="busca-button" onClick={handleBusca}>
                    <span>
                        <FiLogIn color="#fff"/>
                    </span>
                    <strong>Buscar pontos de coleta</strong>
                </div>
            </div>
        </div>
    )
}

export default ModalPoints;