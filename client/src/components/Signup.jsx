import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", username:"", email: "", password: "", confpass: "" });

    const handleClick = async (e) => {
        e.preventDefault();

        if (credentials.confpass !== credentials.password) {
            alert("Both password does not math, please try again.");
            return;
        }

        const responce = await fetch(`/api/auth/createUser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, username: credentials.username, email: credentials.email, password: credentials.password })
        })

        const json = await responce.json();

        console.log(json)
        if (json.success) {
            navigate('/login')
        }
        else {
            alert(json.error)
        }
    }
    
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }    

    return (
        <>
            <h3 className="text-center mx-3 my-5">Create a new account</h3>
            <form className="form-group" onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Create Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={8} />
                </div>

                <div className="mb-3">
                    <label htmlFor="confpass" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  name='confpass' value={credentials.confpass} onChange={onChange} minLength={8} />
                </div>


                <button type="submit" className="btn btn-primary mt-3 mb-5">Create Account</button>

            </form>

        </>
    )
}

export default Signup