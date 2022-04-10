import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const Taskedit = () => {

    const { id } = useParams();
    const [task, setTask] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        axios.get(`task/edit/` + id)
            .then(res => {
                setTask(res.data.data)
                setLoader(false)
            });
    }, [])

    return (
        <div className='container my-5'>
            {loader && (
                <Loader />
            )}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className='card-title'>Edit Task</h4>
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className="mb-3">
                                    <label className='mb-1'>Title</label>
                                    <input type="text" className='form-control' value={task.title} />
                                </div>
                                <div className="mb-3">
                                    <label className='mb-1'>Description</label>
                                    <textarea rows="7" value={task.desc} className="form-control">
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-end">
                            <Link className='btn btn-warning me-2' to={`/view/${task.project_id}`}>Back</Link>
                            <Link className='btn btn-primary' to={`/`}>Update</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taskedit
