import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form >
                <input type="text" name='username' placeholder='Enter username'/>
                <input type="password" name='password' placeholder='Enter password'/>
                <input type="password" name='confirmPassword' />
                <button type='submit'>Register</button>
            </form>
            <p>Already have an acount? <Link className='toggleAuthForm' to="/login">Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
