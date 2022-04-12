import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../component/pages/Loader';
import Swal from 'sweetalert2'


export default class Home extends Component {

    state = {
        project: [],
        isLoading: false,
        user:''
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        this.setState({user:user.user.name})
        this.setState({ isLoading: true })
        axios({
            method:'get',
            url:'project'
        })
            .then(res => {
                const project = res.data.data;
                this.setState({ project });
                this.setState({ isLoading: false });
            })
    }

    projectDelete(value) {
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
                axios.delete(`http://127.0.0.1:8000/api/project/` + value)
                    .then(res => {
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                        const { project } = this.state
                        const index = project.findIndex((pro) => pro.id === value);
                        const proUpdate = [...project.slice(0, index), ...project.slice(index + 1)];
                        this.setState({ project: proUpdate })
                    })
            }
        })

    }

    render() {
        return (
            <div className='container my-5'>
                <div className="row">
                    <div className="col-md-12 my-2">
                        <div className="card">
                            <div className="card-header bg-success d-flex justify-content-between">
                                <h4 className='card-title text-white'>{this.state.user}</h4>
                                <div>
                                    <Link className="btn btn-primary me-2" to="/project/create">Create Project</Link>
                                    <Link className="btn btn-warning" to="task/create">Create Task</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.isLoading && (
                        <Loader />
                    )}
                    {this.state.project.map((pro, index) =>
                        <div className="col-md-4 my-2" key={index}>
                            <div className="card">
                                <div className="card-header">
                                    <h4 className='card-title'>{pro.name} <span className='badge bg-primary'>{pro.task.length}</span></h4>
                                </div>
                                <div className="card-body">
                                    <img className='img-fluid w-100' src={pro.img} alt={pro.name} />
                                    <p className='mt-3'>{pro.desc}</p>
                                    <div className="group-btn mt-4">
                                        <Link to={`/view/${pro.id}`} className='btn btn-primary me-2'>view</Link>
                                        <Link to={`/project/${pro.id}/edit`} className='btn btn-success me-2'>edit</Link>
                                        <button onClick={() => this.projectDelete(pro.id)} className='btn btn-primary btn-danger me-2'>delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
