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
		<div className=' h-screen overflow-hidden flex items-center justify-center '>
			<div className='bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded-xl	'>
				<Link to='/'>
					<div className='bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 shadow-2xl hover:bg-blue-900 hover:rounded-2xl hover:ease-in duration-300 '>
						<AiFillHome className=' text-white text-xl' />
					</div>
				</Link>
				<form onSubmit={onSubmit}>
					<div className='p-14 md:p-16'>
						<div className='flex items-center text-lg mb-6 md:mb-8 '>
							<svg className='absolute ml-3' width='24' viewBox='0 0 24 24'>
								<MdEmail className='text-2xl	' />
							</svg>
							<input
								type='email'
								id='email'
								className='bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-md focus:bg-blue-100 hover:bg-zinc-300'
								placeholder='E-mail'
								value={email}
								onChange={onChange}
							/>
						</div>
						<div className='flex items-center text-lg mb-6 md:mb-8'>
							<svg className='absolute ml-3' viewBox='0 0 24 24' width='24'>
								<path d='m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z' />
							</svg>
							<input
								type='password'
								value={password}
								onChange={onChange}
								id='password'
								className='bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-md focus:bg-blue-100 hover:bg-zinc-300  '
								placeholder='Пароль'
							/>
						</div>
						<button className='bg-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md hover:bg-[#2c3a61] hover:ease-in duration-300  '>
							Войти
						</button>
						<div className='mt-5 flex items-center justify-center'>
							<div className=' text-[13.5px] font-semibold	'>ИЛИ</div>
						</div>
						<GoogleAuth />
						<div className='flex items-center text-lg mt-8'>
							<p className=' m-auto'>
								Нет аккаунта?{' '}
								<Link
									className='text-blue-500 hover:text-violet-700 ml-2'
									to='/register'
								>
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
