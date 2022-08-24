import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Projectcreate = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [errorList, setError] = useState([])
    const [inputField, setInputField] = useState({
        name: '',
        description: ''
    })
    const [image, setImgField] = useState([])

    const inputsHandler = (e) => {
        setInputField((inputField) => ({
            ...inputField,
            [e.target.name]: e.target.value,
        }));
    }

    // image onchange hander
    const handleChange = (e) => {
        setImgField({
            img: e.target.files[0]
        })
    }

    const submitButton = (e) => {
        e.preventDefault();
        setLoader(true)
        const data = new FormData();
        data.append('name', inputField.name)
        data.append('description', inputField.description)
        data.append('img', image.img)

        axios({
            method: 'post',
            url: 'project',
            data: data
        })
            .then(res => {
                if (res.data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        html: res.data.message,
                        icon: 'success'
                    })
                    setError([])
                    setInputField({
                        name: '',
                        description: '',
                        img: ''
                    })
                    document.querySelector("#form").reset();
                    setLoader(false)
                    navigate('/project/create')
                } else if (res.data.status === 422) {
                    setLoader(false)
                    setError(res.data.errors)
                    console.log(res.data.errors)
                }
            })
            .catch(error => {
                console.log(error);
            })


    }


    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className='card-title'>Create Project</h4>
                        </div>
                        <form onSubmit={submitButton} encType="multipart/form-data" id='form'>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className='mb-1'>Name</label>
                                    <input type="text" name='name' onChange={inputsHandler} value={inputField.name} placeholder='Enter your project name' className='form-control' />
                                    <span className="text-danger">{errorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Description</label>
                                    <textarea rows="7" name='description' onChange={inputsHandler} value={inputField.description} placeholder='Enter your project description' className="form-control">
                                    </textarea>
                                    <span className="text-danger">{errorList.description}</span>
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Image</label>
                                    <input type="file" name='img' onChange={handleChange} className="form-control" />
                                    <span className="text-danger">{errorList.img}</span>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <Link className='btn btn-warning me-2' to={`/home`}>Back</Link>
                                {!loader && (
                                    <button type='submit' className='btn btn-primary'>Save</button>
                                )}
                                {loader && (
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Projectcreate;