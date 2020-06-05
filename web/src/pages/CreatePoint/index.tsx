import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

///ChangeEvent: mudança de algum valor
//useEffect: se o array é vazio, a função só será chamada no início, caso tenha o nome de alguma state [items], ela será chamada toda vez que mudar o valor da state items

import './create.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import Modal from '../../components/Modal';

//array ou objeto: manualmente informar o tipo da variável

interface Item {
    id: number;
    nome: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {

    const history = useHistory();

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);//vetor de strings
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
    })
    const [openModal, setOpenModal] = useState(false);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [cities, setCities] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        })
    }, [])

    useEffect(() => {

        api.get('items').then(res => {

            setItems(res.data);
        })

    }, [])

    useEffect(() => {

        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const ufInitials = res.data.map(uf => uf.sigla)

            setUfs(ufInitials);
        });

    }, [])

    useEffect(() => {
        //carregar as cidades sempre que a uf mudar
        if (selectedUf === '0') {
            return;
        }

        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(res => {

                const cityNames = res.data.map(city => city.nome)

                setCities(cityNames);
            });

    }, [selectedUf])

    //ChangeEvent<HTMLSelectElement> = alterando um valor de um elemento HTML
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {

        const uf = event.target.value;
        setSelectedUf(uf);
    }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {

        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {

        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {

        const alreadySelected = selectedItems.findIndex(item => item === id);


        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {

            setSelectedItems([...selectedItems, id]);
        }

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { nome, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            nome,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        await api.post('points', data);
        setOpenModal(true);
        
        setTimeout(() => {
            history.push('/');
        }, 2000)
    }

    return (
        <>
          
            <div id="page-create-point">
                <header>
                    <img src={logo} alt="Ecoleta" />
                    <Link to="/">
                        <FiArrowLeft />
                    Voltar para home
                </Link>
                </header>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br /> ponto de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="nome">Nome da entidade</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input
                                    type="text"
                                    id="whatsapp"
                                    name="whatsapp"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço do mapa</span>
                        </legend>

                        <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={selectedPosition} />
                        </Map>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select
                                    onChange={handleSelectUf}
                                    value={selectedUf}
                                    name="uf"
                                    id="uf">

                                    <option value="0">Selecione uma UF</option>
                                    {
                                        ufs.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select
                                    onChange={handleSelectCity}
                                    value={selectedCity}
                                    name="city"
                                    id="city">
                                    <option value="0">Selecione uma cidade</option>
                                option>
                                {
                                        cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Ítens de coleta</h2>
                            <span>Selecione um ou mais itens abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            {
                                items.map(item => (
                                    <li key={item.id} onClick={() => handleSelectItem(item.id)}
                                        className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                        <img src={item.image_url} alt="Test" />
                                        <span>{item.nome}</span>
                                    </li>
                                )
                                )
                            }
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar ponto de coleta
                </button>
                </form>
            </div>
            {
                openModal != false && <Modal class={'open'}/> 
            }
            
        </>
    )
}

export default CreatePoint;