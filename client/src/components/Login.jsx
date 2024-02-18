import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setcredential] = useState({ username: "", password: "" });
    let navigate = useNavigate();

    //function for handling 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credential.username, password: credential.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('username', json.username)
            navigate('/')
        }
        else {
            alert(json.error)
            // setcredential({ email: "", password: "" })
        }

    }

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    //forgot password logic
    // const sendmail =(email , otp)=>{
    //     // let transporter = nodemailer.createTransport({
    //     //     service: 'gmail',
    //     //     auth: {
    //     //       user: '',
    //     //       pass: 'yourpassword'
    //     //     }
    //     //   });

    // }
    const [autootp, setautootp] = useState(Math.floor(Math.random() * (9767 - 1019 + 1)) + 1019)
    const [inputotp, setinpo] = useState("")
    const [emailid, setemailid] = useState("")
    const generaterandom = () => {
        setautootp(Math.floor(Math.random() * (9767 - 1019 + 1)) + 1019)
        // console.log(autootp)

    }
    const onChangeemail = (e) => {
        setemailid(e.target.value)
        // console.log(emailid)
    }
    
    const onchangeotp = (e) => {
        setinpo(e.target.value)

        // if(inputotp === autootp)

    }
    console.log(autootp)
    const [valid, setvalid] = useState(false)
    //state to check whether otp is sent or not , if sent then we will hide the email input section ans show the otp section
    const [otpsent , setotpsent] = useState(false)
    //function to send otp to the use's email id
    const getOTP = async() => {
        console.log("printing data")
            console.log(emailid)
            console.log(autootp)
            const res =await fetch(`/api/otppwrst/sendotp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailid, otp: autootp })

            })
            let data = await res.json();
            if(data.status === 'Email sent')setotpsent(true);
    }

    const validate = () => {
        if (inputotp == autootp) {
            // console.log("valid")
            setvalid(true)
            setinpo("");
        }
        else {
            console.log("not valid")
        }
    }
    const [newpassword, setnewpw] = useState("")
    const newpw = (e) => {
        setnewpw(e.target.value);
    }
    //state to show change password button
    const passwordChange = async () => {
        const response = await fetch(`/api/auth/forgotpassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ email: emailid, newpw: newpassword })
        })
        console.log(response)
        navigate('/')
    }
    return (
        <>
            <h3 className="text-center mx-3 my-5">Log In to your account</h3>
            <form className='form-group' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="credemail" className="form-label">Username</label>
                    <input type="text" className="form-control" id="credusername" name='username' value={credential.username} onChange={onChange} aria-describedby="usernameHelp" />
                </div>
                <div className="mb-3" >
                    <label htmlFor="credpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange} id="credpassword" name='password' />
                </div>

                <button type="submit" className="btn btn-primary my-3">Log In</button>
                <button type="button" className="btn btn-outline-danger my-3" data-bs-toggle="modal" data-bs-target="#pwChangeModal" onClick={generaterandom}>Forgot Password</button>
            </form>


            {/* <!-- forgot password Modal --> */}
            <div className="modal fade" id="pwChangeModal" tabindex="-1" aria-labelledby="pwChangeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pwChangeModalLabel">Change your Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            {/* //email id input section */}
                            <div className={otpsent == false?'d-block':'d-none'}>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Enter Your email id" aria-label="Enter Your email id" name='email' onChange={onChangeemail} value={emailid}  aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getOTP}>Get OTP</button>
                            </div>
                            </div>
                            {/* otp section */}
                            <div id="otpsection" className={otpsent == true?'d-block':'d-none'}>
                                <p>An email has been sent to your email id with an otp , please enter the otp below... <br />take a look in the spam folder in case you can't find out the otp </p>
                                <div class="col-md-2">
                                    <label for="inputotp" class="form-label">OTP</label>
                                    <input type="number" class="form-control" id="inputotp" name="inputotp" value={inputotp} onChange={onchangeotp} minLength='4' required />
                                    <button className='btn btn-sm btn-outline-success my-2' onClick={validate}>Click</button>
                                </div>

                            </div>
                            {/* <p>{valid}</p> */}
                            {/* Validate Otp section */}
                            
                            <div className={valid == true ? "d-block" : 'd-none'}>
                                {/* new password input */}
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Verified, Enter Your New Password</label>
                                    <input type="password" class="form-control" id="inputPassword4" onChange={newpw} value={newpassword} placeholder='Enter new password' />
                                    <button type="button" className="btn btn-primary" onClick={passwordChange}>Change Password</button>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary" onClick={passwordChange}>Change Password</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login