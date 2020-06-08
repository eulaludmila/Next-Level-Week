import React, { useState, ChangeEvent, useEffect, FormEvent} from 'react';
import Modal from '../../components/Modal';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useParams } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import axios from 'axios'
import api from '../../services/api'
import Dropzone from '../../components/Dropzone';

interface IBGEUFResponse{
    sigla:string
}
interface IBGECityResponse{
    nome:string
}

const CreatePost = () => {
    const history = useHistory();
    const {id} = useParams();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const [form, setForm] = useState({
        name:'',
        text_post:'',
    })
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const ufs = res.data.map(uf => uf.sigla);
    
            setUfs(ufs)
        })
    },[])
    useEffect(() => {

        if(selectedUf === ''){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
            const cities = res.data.map(city => city.nome);
    
            setCities(cities)
        })
    },[selectedUf])

    function handleInputChange(e:ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setForm({...form,[name]:value});
    }
    function handleTextAreaChange(e:ChangeEvent<HTMLTextAreaElement>){
        const {name, value} = e.target;
        setForm({...form,[name]:value});
    }

    function handleSelectUf(event:ChangeEvent<HTMLSelectElement>){
        setSelectedUf(event.target.value);
    }
    function handleSelectCity(event:ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value);
    }

    async function handleSubmit(e:FormEvent){
        e.preventDefault();


        
        const {name, text_post} = form;
        const uf = selectedUf;
        const city = selectedCity;

        const data = new FormData();

        data.append('name', name);
        data.append('text_post', text_post);
        data.append('uf', uf);
        data.append('city', city);
        data.append('point_id',id);

        if(selectedFile){
            data.append('image', selectedFile);
        }

        await api.post('posts', data);
        setOpenModal(true);

        setTimeout(() => {
            history.push('/');
        }, 2000)
    }

    return(
        <>
          
            <div id="page-create-point">
                <header>
                    <img src={logo} alt="Ecoleta" />
                    <Link to="/">
                        <FiArrowLeft />
                    Voltar para home
                </Link>
                </header>
                <form 
                onSubmit={handleSubmit}
                >
                    <h1>Compartilhe com a gente <br /> a sua experiência de fazer reciclagem</h1>
                    <Dropzone  onFileUploaded={setSelectedFile} titulo="Imagem da sua reciclagem"/>
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                id="nome"
                                name="name"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Escreva aqui a sua experiância</label>
                                <textarea
                                    rows={10}
                                    id="email"
                                    name="text_post"
                                    onChange={handleTextAreaChange}
                                />
                            </div>
                           
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                        </legend>

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
                               
                                {
                                        cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                    </fieldset>

                    <button type="submit">
                        Cadastrar 
                </button>
                </form>
            </div>
            {
                openModal !== false && <Modal class={'open'}/> 
            }
            
        </>
    )
}

export default CreatePost;