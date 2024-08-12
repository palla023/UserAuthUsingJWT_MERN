import React, { useState, useContext } from 'react'
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [token, setToken] = useContext(store);
        let navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		password: '',
	})
	const changeHandler = e => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	const submitHandler =async e => {
		try {
			e.preventDefault();
			await axios.post('http://localhost:5000/login', data).then(
				res => {
					setToken(res.data.token);
					navigate('/Myprofile')
				}
			)
		} catch (err) {
			if (err.response) {
				if (err.response.status === 400) {
					alert(err.response.data);
				} else {
					alert('Internal Server Error');
				}
			}
		}
	}
	// if (token) {
	// 	return <Navigate to='/Myprofile' />
	// }
	return (
		<div>
			<center>
				<form onSubmit={submitHandler} autocomplete="off">
					<h3>Login</h3>
					<input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
					<input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
					<input type="submit" value="Login" /><br />
				</form>
			</center>
		</div>
	)
}

export default Login
