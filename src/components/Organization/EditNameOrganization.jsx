import React, { useEffect, useState } from 'react';
import { Alert } from '..';
import { getAllService, putService } from '../../services';
import './index.css'
import { LoaderSpinner } from '../index'

function EditNameOrganization() {
    const [imagePreview, setImagePreview] = useState('');
    const [nameImage, setNameImage] = useState('');
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
            getAllService('organizations/1/public')
            .then((response) => {
                setImagePreview(response.data.image);
                setName(response.data.name);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, []);

    const imageHandler = (e) => {
        const file  =  e.target.files[0];
        const reader = new FileReader();
        if(file){
        reader.onload = () =>{
                if(reader.readyState === 2){
            setImagePreview(reader.result)
            setNameImage(file)
            }
        }
        reader.readAsDataURL(file)
        }
    };

    const handleReset =(e)=>{
        setName('')
        setImagePreview()
    }
      const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", name)
        formData.append("image", nameImage)

         await putService(`organizations/1`, formData
        , { headers: {'Content-Type': 'multipart/form-data'}})
        .then((response)=>{
              Alert({
                title:response.data.message,
                text:"Hecho",
                icon:"success",
                showConfirmButton:false,
                timer:2000
              })
        })
        .catch((error)=>{
            Alert({
                icon: "error",
                title: `${error.data?.message || "Ops..."}`,
                text: error.data?.message,
                timer:1500
              })
            console.log(error)
        })
      }
      
  return (
    <>
      {loading ? <LoaderSpinner /> :
        <>
    <div className="container d-flex justify-content-center ">
        <div className="col col-md-10">

        <form className=""  encType="multipart/form-data" 
        onSubmit={handleSubmit}
        >
            <div className="form-group mb-3">
                <label htmlFor="titulo" className="form-label fs-3">Nombre de la organización</label>
                <input className={'form-control form-control-sm col-md-6'}
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group  mb-3">
                <label htmlFor="titulo" className="form-label fs-3 ">Logo</label>
                <input type={'file'} accept="image/*" filename={imagePreview}
                onChange={(o) => imageHandler(o)} 
                className={'form-control form-control-sm d-flex mb-3 '  }/>
                    {imagePreview &&
                    <div className="image-organization__container d-flex justify-content-center bd-highlight">
                        <img className=" bd-highlight logo-image__organization" 
                        src={imagePreview} alt={name}  name="image"/>
                    </div>
                    } 
            </div>

            <div className="form-group">
                <div className="row row-cols-3">
                    <button className="btn btn-sm btn-primary m-2 col-xs- col-md-3 col-xl-2 d-flex justify-content-center" type="reset" onClick={e=>handleReset(e)} >Borrar</button>
                    <button className="btn btn-sm btn-primary  col-md-3 col-xl-2 m-2 d-flex justify-content-center align-items-center" type="submit" value="Submit" disabled={!name } >Guardar</button>
                </div>
            </div>
        </form>
    </div>
    </div>
    </>
      }
    </>
  );
}

export default EditNameOrganization;
