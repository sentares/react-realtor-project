import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { MdSell } from 'react-icons/md'

export const Profile = () => {
	const navigate = useNavigate()
	const auth = getAuth()
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})
	const { name, email } = formData

	function onLogOut() {
		auth.signOut()
		navigate('/')
	}
	return (
		<div className='profile'>
			<section className='profile_userData'>
				<div className='userDataContent'>
					<img src='/assets/svg/Rectangle-profile.svg' alt='' />
					<div className='profileText'>
						<FaUserCircle className=' w-[90px] h-[90px]' />
						{name}
					</div>
				</div>
			</section>
			<section className='navProfile'>
				<div>
					<button>Мои объявления</button>
				</div>
				<div>
					<button>Понравившиеся</button>
				</div>
				<div>
					<button onClick={onLogOut}>Выйти с профиля</button>
				</div>
			</section>
			<section className='ribbonProfile'>
				<div className='button_block'>
					<div>Объявлении: 0</div>
					<Link to='/createsel'>
						<button>
							<MdSell />
							Создать новое объявление
						</button>
					</Link>
				</div>
			</section>
		</div>
	)
}
