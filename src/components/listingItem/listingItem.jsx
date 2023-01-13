import React, { useState, useContext } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa'
import { MdFavorite, MdFavoriteBorder, MdOutlineBed } from 'react-icons/md'
import { BiBath } from 'react-icons/bi'
import { FaParking } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi'
import { BiEdit } from 'react-icons/bi'
import { Contact } from '../contact'
import { RiShareLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/authContext'
import { useToggleLike } from '../../utils/hooks/likes/useLike'
import { InfoBlock } from './blocks/infoBlock'

export const ListingItem = ({ listing, id, onEdit, onDelete }) => {
	const [shareLinkCopied, setShareLinkCopied] = useState(false)
	const { currentUser } = useContext(AuthContext)

	const { likes } = listing

	const isLiked = likes.includes(currentUser?.uid)
	const config = {
		id,
		isLiked,
		uid: currentUser?.uid,
	}
	const { toggleLike, isLoading: likeLoading } = useToggleLike(config)

	return (
		<li className='listingItem'>
			<Link to={`/category/${listing.type}/${id}`}>
				<div className='image-scale'>
					<img
						src={listing.imgUrls[0]}
						loading='lazy'
						className='housePhoto'
						alt='photo'
					/>
				</div>
				<InfoBlock
					listing={listing}
					type={listing.type}
					name={listing.name}
					timestamp={listing.timestamp}
					address={listing.address}
					bedrooms={listing.bedrooms}
					bathrooms={listing.bathrooms}
					area={listing.area}
					parking={listing.parking}
					offer={listing.offer}
					discountedPrice={listing.discountedPrice}
					regularPrice={listing.regularPrice}
				/>{' '}
			</Link>

			<div className='userInfo'>
				<div className='userName'>
					<FaUserCircle className='userIcon' />
					<Contact userRef={listing.userRef} listing={listing} />
				</div>

				{onEdit && onDelete ? (
					<>
						<div className='infoIcons'>
							<BiEdit className='edit' onClick={() => onEdit(listing.id)} />
							<HiTrash className='trash' onClick={() => onDelete(listing.id)} />
						</div>
					</>
				) : (
					<div className='infoIcons'>
						<div className='save' onClick={() => toggleLike()}>
							<div className='countLikes'>{listing.likes.length}</div>
							{isLiked ? (
								<MdFavorite className='likeOn' />
							) : (
								<MdFavoriteBorder className='likeOff' />
							)}
						</div>
						<div className='shareIcon'>
							<RiShareLine
								className='edit'
								onClick={() => {
									navigator.clipboard.writeText(window.location.href)
									setShareLinkCopied(true)
									setTimeout(() => {
										setShareLinkCopied(false)
									}, 2000)
									toast.success('Страница скопирована')
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</li>
	)
}
