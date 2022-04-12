import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const [errorList, setError] = useState([])
  const [warning, setSetwarning] = useState()
  const [inputField, setInputField] = useState({
    email: '',
    password: ''
  })

  const inputsHandler = (e) => {
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      email: inputField.email,
      password: inputField.password
    }
    axios({
      method: 'post',
      url: 'access',
      data: data
    }).then(res => {
      if (res.data.status == 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setError([])
        navigate('/home')
      } else if (res.data.status == 422) {
        setError(res.data.errors)
        setSetwarning()
      } else if (res.data.status == 'error') {
        setSetwarning(res.data.message)
        setError([])
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body">
            {warning && (
              <div className="alert alert-danger">
                {warning}
              </div>
            )}
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label>Email:</label>
                <input type="text" name='email' onChange={inputsHandler} value={inputField.name} className="form-control" />
                <span className="text-danger">{errorList.email}</span>
              </div>
              <div className="mb-3">
                <label>Password:</label>
                <input type="password" onChange={inputsHandler} name='password' value={inputField.password} className="form-control" />
                <span className="text-danger">{errorList.password}</span>
              </div>
              <button type='submit' className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
