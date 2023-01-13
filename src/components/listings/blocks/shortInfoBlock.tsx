import { FC } from 'react'
import { BiBath } from 'react-icons/bi'
import { FaParking } from 'react-icons/fa'
import { GiSofa } from 'react-icons/gi'
import { MdOutlineBed } from 'react-icons/md'
import { TbParkingOff } from 'react-icons/tb'

interface IListing {
	bathrooms: string
	bedrooms: string
	furnished: boolean
	parking: boolean
}

export const ShortInfoBlock: FC<IListing> = listing => {
	return (
		<div className='shortInfo'>
			<div className='infoElements shadow-xl'>
				<div className='infoBlock'>
					{listing.furnished ? (
						<div className='sofa'>
							<GiSofa />
						</div>
					) : (
						<div className='noSofa'>
							<GiSofa />
						</div>
					)}
					<div className='beds'>
						<MdOutlineBed /> {listing.bedrooms}
					</div>
					<div>
						<BiBath />
						{listing.bathrooms}
					</div>
					{listing.parking ? (
						<div className='parking'>
							<FaParking />
						</div>
					) : (
						<div className='parking'>
							<TbParkingOff />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
