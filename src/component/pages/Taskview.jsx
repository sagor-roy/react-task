import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from './Loader';
import Swal from 'sweetalert2';

const Taskview = () => {

    const { id } = useParams();
    const [task, setTask] = useState([]);
    const [loader, setLoader] = useState(false);
    const [project, setProject] = useState([]);

    useEffect(() => {
        setLoader(true)
        axios.get(`task/view/` + id)
            .then(res => {
                setTask(res.data.data)
                setLoader(false)
                setProject(res.data.project)
            });
    }, [])

    function taskDelete(value) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`task/` + value)
                    .then(res => {
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                        const newList = task.filter((item) => item.id !== value);
                        setTask(newList);
                    })
            }
        })
    }

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-8 offset-md-2 my-2">
                    <div className="card">
                        <div className="card-header bg-success d-flex justify-content-between">
                            <h4 className='card-title text-white'>{project.name}</h4>
                            <Link className="btn btn-warning" to="/home">Back</Link>
                        </div>
                    </div>
                    {loader && (
                        <Loader />
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
                                <Link className='btn btn-primary me-2' to={`/task/edit/${task.id}`}>Edit</Link>
                                <button onClick={() => taskDelete(task.id)} className='btn btn-primary btn-danger me-2'>delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Taskview;
