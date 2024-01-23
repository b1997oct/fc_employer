import { UploadButton } from './ProfileFiles'

export default function Gallery({ image, setImage, url }) {
    const imgUrl = image ? URL.createObjectURL(image) : url || ''
    return (
        <div>
            <label>Baner Image</label>
            <div className='df gap jcc aic'>
                <img
                    src={imgUrl}
                    style={{ width: 160, height: 80 }}
                    alt='company banners'
                    className='rounded-sm image w-full'
                />
            </div>
            <div className='mt w-full'>
                <UploadButton
                    onChange={(file) => {
                        if (file) {
                            setImage(file)
                        }
                    }}
                    className='w-full'
                >
                    Upload
                </UploadButton>
            </div>
        </div>
    )
}
