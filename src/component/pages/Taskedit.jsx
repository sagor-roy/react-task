import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Taskedit extends Component {

  render() {
    return (
      <div className='container my-5'>
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
                                 <input type="text" className='form-control' value='Lorem ipsum, dolor sit amet consectetur adipisicing elit.'/>
                             </div>
                             <div className="mb-3">
                                 <label className='mb-1'>Description</label>
                                 <textarea rows="7" className="form-control">
                                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, nulla. Totam animi perferendis quia mollitia cumque! Ipsa distinctio porro quisquam quibusdam dolores hic asperiores architecto ad impedit eos, repudiandae consequuntur, ducimus accusantium sint, laboriosam explicabo cum illum molestiae esse! Iusto voluptatibus accusantium adipisci modi eius velit delectus cum non ullam.
                                 </textarea>
                             </div>
                         </form>
                      </div>
                      <div className="card-footer text-end">
                          <Link className='btn btn-warning me-2' to={`/view`}>Back</Link>
                          <Link className='btn btn-primary' to={`/`}>Update</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
