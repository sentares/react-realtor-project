import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { db } from '../firebase'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuth } from '../components/auth/googleAuth'

export const SignUp = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const { name, email, password } = formData
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
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			updateProfile(auth.currentUser, {
				displayName: name,
			})
			const user = userCredential.user
			const formDataCopy = { ...formData }
			delete formDataCopy.password
			formDataCopy.timestamp = serverTimestamp()
			formDataCopy.uid = user.uid
			await setDoc(doc(db, 'users', user.uid), formDataCopy)

			toast.success('регистрация прошла успешно!')
			navigate('/')
		} catch (error) {
			toast.error('что-то пошло не так(')
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
								<path d='M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z' />
							</svg>

							<input
								type='text'
								id='name'
								className='bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-md focus:bg-blue-100 hover:bg-zinc-300'
								placeholder='Ваше имя'
								value={name}
								onChange={onChange}
							/>
						</div>
						<div className='flex items-center text-lg mb-6 md:mb-8 '>
							<svg className='absolute ml-3' width='24' viewBox='0 0 24 24'>
								<MdEmail className='text-2xl	' />
							</svg>{' '}
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
							Регистрация
						</button>
						<div className='mt-5 flex items-center justify-center'>
							<div className=' text-[13.5px] font-semibold	'>ИЛИ</div>
						</div>
						<GoogleAuth />
						<div className='flex items-center text-lg mt-8'>
							<p className=' m-auto'>
								Есть аккаунт?
								<Link
									className='text-blue-500 hover:text-violet-700 ml-2'
									to='/sign-in'
								>
									Войти
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
