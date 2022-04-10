import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Taskcreate = () => {

    const navigate = useNavigate();
    const [projects, setProject] = useState([]);
    const [errorList, setError] = useState([])
    const [inputField, setInputField] = useState({
        project: '',
        title: '',
        description: ''
    })

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/project`)
            .then(res => {
                setProject(res.data.data)
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
        axios.post('task/store', {
            project: inputField.project,
            title: inputField.title,
            description: inputField.description
        })
            .then(res => {
                if (res.data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        html: res.data.message,
                        icon: 'success'
                    })
                    setInputField({
                        project: '',
                        title: '',
                        description: ''
                    })
                    setError([])
                    navigate('/task/create')
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
                            <h4 className='card-title'>Create Task</h4>
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className="mb-3">
                                    <select name='project' onChange={inputsHandler} value={inputField.project} className="form-control">
                                        {projects.map((pro, index) =>
                                            <option key={index} value={pro.id}>{pro.name}</option>
                                        )}
                                    </select>
                                    <span className="text-danger">{errorList.project}</span>
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Title</label>
                                    <input type="text" onChange={inputsHandler} value={inputField.title} name='title' placeholder='Enter your task title' className='form-control' />
                                    <span className="text-danger">{errorList.title}</span>
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Description</label>
                                    <textarea rows="7" onChange={inputsHandler} value={inputField.description} name='description' placeholder='Enter your task description' className="form-control">
                                    </textarea>
                                    <span className="text-danger">{errorList.description}</span>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-end">
                            <Link className='btn btn-warning me-2' to={`/home`}>Back</Link>
                            <button onClick={submitButton} className='btn btn-primary' to={`/`}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Taskcreate;