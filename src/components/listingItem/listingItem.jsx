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

				<div className='information'>
					<div className='type'>
						{listing.type === 'sale' ? (
							<p className='sale'>Продажа</p>
						) : (
							<p className='rent'>Аренда</p>
						)}
					</div>
					<div className='tag'>
						<p>#{listing.name}</p>
					</div>
					<div className='date'>
						<Moment fromNow>{listing.timestamp?.toDate()}</Moment>
					</div>

					<div className='address'>
						<FaMapMarkerAlt className=' text-[#4a60a1]' />
						<p>{listing.address}</p>
					</div>

					<div className='bedBath'>
						<div className='bedrooms'>
							<MdOutlineBed className=' w-5' /> {listing.bedrooms}
						</div>
						<div className='bathrooms'>
							<BiBath className=' w-5' />
							{listing.bathrooms}
						</div>
						{listing.parking && (
							<div className='parking'>
								<FaParking />
							</div>
						)}
						<div className='area'>{listing.area}м²</div>
					</div>
					<div className='price'>
						<div className='totalPrice'>
							$
							{listing.offer
								? listing.discountedPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: listing.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							{listing.offer && (
								<p className='oldPrice'>
									<strike>
										$
										{listing.regularPrice
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</strike>
								</p>
							)}
							{listing.type === 'rent' && ' / месяц'}
						</div>
					</div>
				</div>
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
