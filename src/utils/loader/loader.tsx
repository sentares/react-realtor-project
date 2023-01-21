export const LoaderElement = () => {
	return (
		<div className='loaderElement'>
			<svg
				className='pl'
				viewBox='0 0 64 64'
				width='64px'
				height='64px'
				xmlns='http://www.w3.org/2000/svg'
			>
				<defs>
					<linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0%' stopColor='#000' />
						<stop offset='100%' stopColor='#fff' />
					</linearGradient>
					<mask id='grad-mask'>
						<rect x='0' y='0' width='64' height='64' fill='url(#grad)' />
					</mask>
				</defs>
				<circle
					className='pl__ring'
					cx='32'
					cy='32'
					r='26'
					fill='none'
					stroke='hsl(223,90%,55%)'
					strokeWidth='12'
					strokeDasharray='169.65 169.65'
					strokeDashoffset='-127.24'
					strokeLinecap='round'
					transform='rotate(135)'
				/>
				<g fill='hsl(223,90%,55%)'>
					<circle
						className='pl__ball1'
						cx='32'
						cy='45'
						r='6'
						transform='rotate(14)'
					/>
					<circle
						className='pl__ball2'
						cx='32'
						cy='48'
						r='3'
						transform='rotate(-21)'
					/>
				</g>
				<g mask='url(#grad-mask)'>
					<circle
						className='pl__ring'
						cx='32'
						cy='32'
						r='26'
						fill='none'
						stroke='hsl(283,90%,55%)'
						strokeWidth='12'
						strokeDasharray='169.65 169.65'
						strokeDashoffset='-127.24'
						strokeLinecap='round'
						transform='rotate(135)'
					/>
					<g fill='hsl(283,90%,55%)'>
						<circle
							className='pl__ball1'
							cx='32'
							cy='45'
							r='6'
							transform='rotate(14)'
						/>
						<circle
							className='pl__ball2'
							cx='32'
							cy='48'
							r='3'
							transform='rotate(-21)'
						/>
					</g>
				</g>
			</svg>
		</div>
	)
}
