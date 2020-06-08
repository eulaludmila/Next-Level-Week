import React, { useState, useEffect} from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import {Link} from 'react-router-dom'
import ModalPoints from '../../components/ModalPoints'



interface Items {
    id: number;
    nome: string;
    image_url: string;
}

interface Points {
    id:number;
    nome: string;
    email: string;
    city: string;
    uf: string;
    whatsapp: string;
    image_url: string;
}

const Points = () => {
  
  
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [points, setPoints] = useState<Points[]>([]);
    const [items, setItems] = useState<Items[]>([])
    const [openModal, setOpenModal] = useState(true);

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data);
        })
    }, [])


    function handleSelectItem(id: number) {


        //procura no array se já tem o id do item selecionado
        const alreadySelected = selectedItems.findIndex(item => item === id);

        //se o valor for 0 ou maior que zero, quer dizer que possui e faz um filtro tirando
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            //se nçao eu pego o id e coloco no array
            setSelectedItems([...selectedItems, id]);
        }

    }

    function handleShowPoints(uf:string, city:string){
        api.get('points-all',{
            params:{
                uf,
                city
            }
        }).then(res => {
            setPoints(res.data);
            setOpenModal(false);
        })
        
    }

    return (

        <div id="page-points">

            <div className="content">
                <header>
                    <img src={require('../../assets/logo.svg')}  alt="Ecoleta"></img> <Link to="/"><span><FiArrowLeft color="#2FB86E" /> Voltar</span></Link>
                </header>
              {
                  !openModal && <div className="filtro" onClick={() => setOpenModal(true)}>Mudar Filtro</div>
              }
                <div id="content-points">
                {
                 points.map(point => (
                        <div key={point.id} className="points">
                                <img src={point.image_url} alt={point.nome}></img>
                                <h2>{point.nome}</h2>
                                <h4>Dados:</h4>
                                <p>{point.email}</p>
                                <p>{point.whatsapp}</p>
                                <p>{point.city} - {point.uf}</p>
                                <Link to={`/create-post/${point.id}`} style={{marginTop:20}}>Compartilhe sua experiência com a gente</Link>

                            </div>
                 ))
             }
                </div>

            </div>
           {
               openModal &&  <ModalPoints dados={(uf:string, city:string) => handleShowPoints(uf, city)}/>
           }
        </div>
    )
}

export default Points;