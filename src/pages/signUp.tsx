import React, { FC, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { db } from '../firebase'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { GoogleAuth } from '../components/auth/googleAuth'

interface FormData {
	name: string
	email: string
	password: string
	timestamp?: any
	uid?: string
}

export const SignUp: FC = (): JSX.Element => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		password: '',
	})
	const { name, email, password } = formData

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: name,
				})
			}
			const user = userCredential.user
			if (user) {
				const formDataCopy = { ...formData }
				// delete formDataCopy.password
				formDataCopy.timestamp = serverTimestamp()
				formDataCopy.uid = user.uid
				await setDoc(doc(db, 'users', user.uid), formDataCopy)
			}
			toast.success('Успешная регистрация!')
			navigate('/')
		} catch (error) {
			toast.error('Профиль с таким email-ом уже существует')
		}
	}

	return (
		<div className='signUp'>
			<div className='bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded-xl'>
				<Link to='/'>
					<div className='home '>
						<AiFillHome className='homeIcon' />
					</div>
				</Link>
				<form onSubmit={onSubmit}>
					<div className='form'>
						<div className='inputBlock'>
							<svg className='svgElem' width='24' viewBox='0 0 24 24'>
								<path d='M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z' />
							</svg>

							<input
								type='text'
								id='name'
								className='input'
								placeholder='Ваше имя'
								value={name}
								onChange={onChange}
							/>
						</div>
						<div className='inputBlock'>
							<svg className='svgElem' width='24' viewBox='0 0 24 24'>
								<MdEmail className='text-2xl	' />
							</svg>{' '}
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

						<button className='buttonAdd'>Регистрация</button>
						<div className='emptySpace'>
							<div className='orSpace'>ИЛИ</div>
						</div>
						<GoogleAuth />
						<div className='haveAcc'>
							<p className='accText'>
								Есть аккаунт?
								<Link className='pressInto' to='/sign-in'>
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
