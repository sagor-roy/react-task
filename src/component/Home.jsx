import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../component/pages/Loader';

export default class Home extends Component {

    state = {
        project: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get(`http://127.0.0.1:8000/api/project`)
            .then(res => {
                const project = res.data.data;
                this.setState({ project });
                this.setState({ isLoading: false });
            })
    }

    render() {
        return (
            <div className='container my-5'>
                <div className="row">
                    <div className="col-md-8 offset-md-2 my-2">
                        <div className="card">
                            <div className="card-header bg-success d-flex justify-content-between">
                                <h4 className='card-title text-white'>Task Management</h4>
                                <div>
                                    <Link className="btn btn-primary me-2" to="/">Create Project</Link>
                                    <Link className="btn btn-warning" to="/">Create Task</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.isLoading && (
                        <Loader/>
                    )}
                    {this.state.project.map((pro, index) =>
                        <div className="col-md-8 offset-md-2 my-2" key={index}>
                            <div className="card">
                                <div className="card-header">
                                    <h4 className='card-title'>{pro.name} <span className='badge bg-primary'>{pro.task.length}</span></h4>
                                </div>
                                <div className="card-body">
                                    <h5>{pro.desc}</h5>
                                    <div className="group-btn mt-4">
                                        <Link to={`/view/${pro.id}`} className='btn btn-primary me-2'>view</Link>
                                        <Link to="/project/edit" className='btn btn-success me-2'>edit</Link>
                                        <Link to="/" className='btn btn-primary btn-danger me-2'>delete</Link>
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
