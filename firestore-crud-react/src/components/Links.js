import React from 'react'
import LinkForm from './LinkForm'

import {db} from '../firebase'

const Links = () =>{

    //Agregar dato
    const addOrEditLink = async (linkObject) =>{
        //en la bd, en la colecion, crea un objeto
        await db.collection('links').doc().set(linkObject)
        console.log("new task added")
    }

    return <div className="col">
            <LinkForm addOrEditLink={addOrEditLink}/>
        </div>
}

export default Links;