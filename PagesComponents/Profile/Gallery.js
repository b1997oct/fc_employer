import { UploadButton } from './ProfileFiles'

export default function Gallery({ images, setImages }) {
    return (
        <div>
            <label>Baner Image</label>
            <div className='df gap jcc aic'>
                {images &&
                    <img
                        src={URL.createObjectURL(images)}
                        style={{ width: 160, height: 80 }}
                        alt='company banners'
                        className='rounded-sm image w-full'
                    />}
            </div>
            <div className='mt w-full'>
                <UploadButton
                    onChange={(file) => {
                        if (file) {
                            setImages(file)
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
