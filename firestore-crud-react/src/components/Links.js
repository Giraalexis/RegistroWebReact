import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'

import {db} from '../firebase'

const Links = () =>{

    const [links,setLinks] = useState([]);

    //Agregar dato
    const addOrEditLink = async (linkObject) =>{
        //en la bd, en la colecion, crea un objeto (ejemplo())
        await db.collection('links').doc().set(linkObject);
        console.log("new task added");
    }

    //Eliminar Enlace
    const onDeleteLink = async (id)=>{
        if(window.confirm("¿ Seguro que desea eliminar este enlace ?")){
            //de esta colecion, el documento con esta id, eliminalo
            await db.collection('links').doc(id).delete();
            console.log("task delete");
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
            <LinkForm addOrEditLink={addOrEditLink}/>
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
                                <i className="btn btn-lg material-icons text-warning">create</i>
                            </div>     
                            <a href={link.url} target="_blanck">Ir al sitio</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
}

export default Links;