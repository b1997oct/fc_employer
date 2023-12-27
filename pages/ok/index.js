
export default function Page() {
    return (
        <div style={{ background: '#66f1' }}>
            <div className='df jcc aic h-screen'>
                <div style={{ maxWidth: 450, marginTop: -120 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <p className='tac fs1'>Thank you for submiting We will be back to you soon</p>
                    <div style={{marginTop:24}} className="df">
                        <div className="f-1">
                            <a href="https://firstcareer.co" >
                                firstcareer.co
                            </a>
                        </div>
                       
                        <a href='mailto:info@firstcareer.co'
                            target='_blank' className='a mr'>Email</a>
                        <a
                            href={"https://wa.me/+918904472228?text=" + encodeURIComponent(`Hi`)}
                            target='_blank' className='a'>WhatsApp</a>
                    </div>
                </div>
            </div>
        </div >
    )
}

