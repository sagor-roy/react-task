import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {

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
                    <div className="col-md-8 offset-md-2 my-2">
                        <div className="card">
                            <div className="card-header">
                                <h4 className='card-title'>Project-1 <span className='badge bg-primary'>5</span></h4>
                            </div>
                            <div className="card-body">
                                <h5>Lorem ipsum dolor sit amet.</h5>
                                <div className="group-btn mt-4">
                                    <Link to="/view" className='btn btn-primary me-2'>view</Link>
                                    <Link to="/project/edit" className='btn btn-success me-2'>edit</Link>
                                    <Link to="/" className='btn btn-primary btn-danger me-2'>delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
