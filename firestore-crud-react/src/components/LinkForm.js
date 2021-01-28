import React, {useState} from 'react'


const LinkForm = (props) =>{

    //iniciar valores en blanco 
    const initialStateValues = { 
        url: '',
        name: '',
        descripcion: ''
    }

    //useState devuelve los valores y la funcion para 'setear'
    const [values, setValues] = useState(initialStateValues);

    //cuando se escriba algo (onChange), guardar en el estado
    const handleInputChange = e=>{
        //captura el nombre y el valor 
        const {name, value} = e.target;
        //Definir valores del estado actual (Guarda lo escrito)
        //  añadir a lo existente, con el nombre, el valor.
        setValues({...values, [name]: value})

        
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(values);
        props.addOrEditLink(values)
        setValues({...initialStateValues})
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-secondary">
                <i className="material-icons">insert_link</i>
                </div>
                <input value={values.url} onChange={handleInputChange} className="form-control" type="text" placeholder="Url..." name="url"/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-success">
                    <i className="material-icons">create</i>
                </div>
                <input value={values.name} onChange={handleInputChange} className="form-control" name="name" placeholder="Nombre de la Web" type="text"/>
            </div>
            <div className="form-group">
                <textarea value={values.descripcion} onChange={handleInputChange} className="form-control" name="descripcion" rows="3" placeholder="Ingresar descripcion del sitio Web"></textarea>
            </div>
            <button className="btn btn-block bg-warning">Guardar</button>
        </form>
    )
}

export default LinkForm;