import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import Swal from 'sweetalert2';

const Projectedit = () => {

    const { id } = useParams();
    const navigate  = useNavigate();
    const [pro, setPro] = useState([]);
    const [loader, setLoader] = useState(false);
    const [errorList, setError] = useState([])
    const [inputField, setInputField] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        setLoader(true)
        axios.get(`http://127.0.0.1:8000/api/project/`+id+`/edit/`)
            .then(res => {
                setPro(res.data.data)
                setLoader(false)
            });
    }, [])

    const inputsHandler = (e) => {
        setInputField((inputField) => ({
            ...inputField,
            [e.target.name]: e.target.value,
        }));
    };

    const submitButton = (e) => {
        e.preventDefault();
        axios.put(`project/`+id, {
            name: inputField.name,
            description: inputField.description
        })
            .then(res => {
                if (res.data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        html: res.data.message,
                        icon: 'success'
                      })
                    navigate('/')
                    errorList([])
                } else if (res.data.status === 422) {
                    setError(res.data.errors)
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className='card-title'>Edit Project</h4>
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className="mb-3">
                                    <label className='mb-1'>Name</label>
                                    <input type="text" name='name' onChange={inputsHandler} className='form-control' value={inputField.name} />
                                    <span className="text-danger">{errorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Description</label>
                                    <textarea rows="7" name='description' onChange={inputsHandler} value={inputField.description} className="form-control">
                                    </textarea>
                                    <span className="text-danger">{errorList.description}</span>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-end">
                            <Link className='btn btn-warning me-2' to={`/home`}>Back</Link>
                            <button onClick={submitButton} className='btn btn-primary' to={`/`}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Projectedit;