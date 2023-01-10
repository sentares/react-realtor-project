import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuth } from '../components/auth/googleAuth'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'

export const SignIn = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData
	const navigate = useNavigate()
	function onChange(e) {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}
	async function onSubmit(e) {
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (userCredential.user) {
				navigate('/')
				toast.success('Добро пожаловать')
			}
		} catch (error) {
			toast.error('Неправильные данные пользователя')
		}
	}
	return (
		<div className='signIn'>
			<div className='bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded-xl	'>
				<Link to='/'>
					<div className='home '>
						<AiFillHome className='homeIcon' />
					</div>
				</Link>
				<form onSubmit={onSubmit}>
					<div className='form'>
						<div className='inputBlock'>
							<svg className='svgElem' width='24' viewBox='0 0 24 24'>
								<MdEmail className='text-2xl	' />
							</svg>
							<input
								type='email'
								id='email'
								className='input'
								placeholder='E-mail'
								value={email}
								onChange={onChange}
							/>
						</div>
						<div className='inputBlock'>
							<svg className='svgElem' viewBox='0 0 24 24' width='24'>
								<path d='m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z' />
							</svg>
							<input
								type='password'
								value={password}
								onChange={onChange}
								id='password'
								className='input'
								placeholder='Пароль'
							/>
						</div>
						<button className='buttonAdd'>Войти</button>
						<div className='emptySpace'>
							<div className='orSpace'>ИЛИ</div>
						</div>
						<GoogleAuth />
						<div className='haveAcc'>
							<p className='accText'>
								Нет аккаунта?{' '}
								<Link className='pressInto' to='/register'>
									Зарегистрироваться
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
