import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'

import {db} from '../firebase'
import {toast} from 'react-toastify'

const Links = () =>{

    const [links,setLinks] = useState([]);
    const [currentId,setCurrentId] = useState('');

    //Agregar dato
    const addOrEditLink = async (linkObject) =>{
        try{
            if(currentId === ''){ //si no esta editando (el estado current es vacio)
                //en la bd, en la colecion, crea un objeto 
                await db.collection('links').doc().set(linkObject);
                toast('Nuevo enlace agregado', {type:'success'});
    
            } else { //si tiene un id, se actualiza
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Sitio actualizado', {type:'info'});
                setCurrentId('');
            }
        }catch(e){
            toast('Error de conexion bd', {type:'warning'});
        }
        
        
    }

    //Eliminar Enlace
    const onDeleteLink = async (id)=>{
        try{
            if(window.confirm("¿ Seguro que desea eliminar este enlace ?")){
                //de esta colecion, el documento con esta id, eliminalo
                await db.collection('links').doc(id).delete();
                toast('Enlace eliminado', {type:'error'});
            }
        }catch(e){
            toast('Error de conexion bd', {type:'warning'});
        }
        
    }

    //obtiene los datos de la bd y los muestra, si estos cambian, los actualiza
    const getLinks = async ()=>{
        //obtener una 'foto' de la bd, si cambia....
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            //mostrar los datos
            querySnapshot.forEach((doc) =>{
                //añade a docs, el documento y su id
                docs.push({...doc.data(), id: doc.id});
            });
            //Guarda los documentos en  el estado 'links'
            setLinks(docs);
        });
        
    };

    //cuando cambia o muta
    useEffect(()=>{
        getLinks()
    }, [])

    return <div className="col">
            <LinkForm {...{addOrEditLink, currentId, links}}/>
            <div className="col mx-auto p-0 pb-4">
                {links.map( (link) =>( 
                    <div className="card mt-2" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <i  onClick={ () => onDeleteLink(link.id)} className="btn btn-lg material-icons text-danger">close</i>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>{link.descripcion}</p>
                                <i onClick={() => setCurrentId(link.id)} className="btn btn-lg material-icons text-warning">create</i>
                            </div>     
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Ir al sitio</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
}

export default Links;