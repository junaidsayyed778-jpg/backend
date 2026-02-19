import { Link } from "react-router-dom"
import "../styles/form.scss"
const Login = () => {
  return (
  <main>
    <div className="form-container">
        <h1>Login</h1>
        <form action="">
            <input type="text" name='username' placeholder='Enter username' />
            <input type="password" name='password' placeholder='Enter password'/>
            <button type='submit'>Login</button>
        </form>
        <p>Don't have an acount <Link className="toggleAuthForm" to="/register">Register</Link></p>
    </div>
  </main>
  )
}

export default Login
