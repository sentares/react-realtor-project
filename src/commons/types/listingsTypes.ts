export interface IListings {
	listings: [
		{
			address: string
			area: string
			bathrooms: string
			bedrooms: string
			description: string
			furnished: boolean
			geolocation: { lat: number; lng: number }
			imgUrls: string[]
			likes: string[]
			name: string
			offer: boolean
			parking: boolean
			phoneNumber: string
			regularPrice: string
			timestamp: object
			type: string
			userRef: string
			id: string
		}
	]
	allListing:
		| [
				{
					address: string
					area: string
					bathrooms: string
					bedrooms: string
					description: string
					furnished: boolean
					geolocation: { lat: number; lng: number }
					imgUrls: string[]
					likes: string[]
					name: string
					offer: boolean
					parking: boolean
					phoneNumber: string
					regularPrice: string
					timestamp: object
					type: string
					userRef: string
					id: string
				}
		  ]
		| null
}
