import { UploadButton } from './ProfileFiles'

export default function Gallery({ images, setImages }) {
  return (
    <div className='df jcc fdc aic gap'>

    <label>Company Image Gallery</label>
    <div
        className='df fww gap jcc aic'
    >
        {images.length && images.map((value, i) => (
            <img
                key={i}
                src={URL.createObjectURL(value)}
                style={{ objectFit: 'cover', maxWidth: 160, maxHeight: 80 }}
                alt='company banners'
                className='rounded-sm w-full'
            />
        ))}
    </div>
    <div className='mt w-full'>
        <UploadButton
            onChange={(file) => {
                if (file) {
                    setImages([...images, file])
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
