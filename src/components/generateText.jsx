import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'
import { MdContentCopy, MdOutlineClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { LoaderElement } from '../utils/loader/loader'

const configuration = new Configuration({
	organization: 'org-j5D24Df31GtAObzMePX9ZDma',
	apiKey: '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',
})
const openai = new OpenAIApi(configuration)

export const GenerateText = () => {
	const [openTextPopup, setOpenTextPopup] = useState(true)
	const [prompt, setPrompt] = useState('')
	const [textResult, setTextResult] = useState('')
	const [loading, setLoading] = useState(false)

	const copyText = () => {
		if (textResult) {
			const text = document.getElementById('textToCopy').innerText
			const tempInput = document.createElement('input')
			tempInput.value = text
			document.body.appendChild(tempInput)
			tempInput.select()
			document.execCommand('copy')
			document.body.removeChild(tempInput)
			toast.success('текст скопирован')
		}
	}

	const callApi = async () => {
		setLoading(true)
		if (!prompt || prompt.length < 4) return toast.error('Пустое поле')

		try {
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: `${prompt}`,
				temperature: 0,
				max_tokens: 470,
			})
			setLoading(false)
			setTextResult(`${response.data.choices[0].text}`)
		} catch (error) {
			setLoading(false)
			console.log('Error 2')
		}
	}

	return (
		<>
			{openTextPopup && (
				<div className='generateTextPopup'>
					<div className='content'>
						<div className='close'>
							<button
								className='closeIcon'
								onClick={() => setOpenTextPopup(false)}
							>
								<MdOutlineClose />
							</button>
						</div>
						<div className='generation'>
							<div>
								<textarea
									className='textArea'
									cols={55}
									rows={2}
									onChange={e => setPrompt(e.target.value)}
									placeholder='Сначала напишите: "Придумай краткое описание", затем что должно быть в описании и кол-во предложении'
								></textarea>
								<div className='buttonBlock'>
									<button className='activeButton' onClick={callApi}>
										Сгенерировать
									</button>
								</div>
								<div className='resBlock'>
									{loading ? (
										<LoaderElement className='loaderElement' />
									) : (
										<>
											{textResult ? (
												<div className='responseText'>
													<div id='textToCopy' className='textAreaResult'>
														{textResult}
														<button className='copyButton' onClick={copyText}>
															<MdContentCopy className='copyIcon' />
														</button>
													</div>
												</div>
											) : (
												<div className='textAreaWait'>
													Здесь будет ответ от ИИ
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
