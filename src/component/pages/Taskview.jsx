import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from './Loader';

const Taskview = () => {

    const { id } = useParams();
    const [task, setTask] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        axios.get(`http://127.0.0.1:8000/api/task/view/` + id)
            .then(res => {
                setTask(res.data.data)
                setLoader(false)
            });
    }, [])

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-8 offset-md-2 my-2">
                    <div className="card">
                        <div className="card-header bg-success d-flex justify-content-between">
                            <h4 className='card-title text-white'>Project Name</h4>
                            <Link className="btn btn-warning" to="/">Back</Link>
                        </div>
                    </div>
                    {loader && (
                        <Loader/>
                    )}
                    {task.map((task, index) =>
                        <div className="card my-2" key={index}>
                            <div className="card-header d-flex justify-content-between">
                                <h4 className='card-title'>{task.title}</h4>
                            </div>
                            <div className="card-body">
                               {task.desc}
                            </div>
                            <div className="card-footer">
                                <Link className='btn btn-primary me-2' to={`/task/edit`}>Edit</Link>
                                <Link className='btn btn-danger' to={`/`}>Delete</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Taskview;
