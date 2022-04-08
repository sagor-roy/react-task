import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Taskview extends Component {

  render() {
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

                  <div className="card my-2">
                      <div className="card-header d-flex justify-content-between">
                          <h4 className='card-title'>Task Name</h4>
                      </div>
                      <div className="card-body">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, minus magni optio unde autem velit voluptates mollitia libero aliquam sint officia minima molestiae nobis voluptatem adipisci? Blanditiis nam possimus, eum impedit numquam atque deleniti exercitationem, veritatis placeat sint magnam. Dicta reiciendis inventore ipsum? Expedita voluptas neque, fuga asperiores eum quibusdam?
                      </div>
                      <div className="card-footer">
                          <Link className='btn btn-primary me-2' to={`/task/edit`}>Edit</Link>
                          <Link className='btn btn-danger' to={`/`}>Delete</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
