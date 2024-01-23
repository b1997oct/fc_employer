
export default function Page() {
    return (
        <div style={{ background: '#66f1' }}>
            <div className='df jcc aic h-screen'>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <p className='tac fs1'>
                        Thank you for your interest in First Career. Your application has been received, and our Backend team will review it. We will be in touch with you shortly
                    </p>
                    {/* <p className='tac fs1'>Thank you for submiting We will be back to you soon</p> */}
                    <div style={{ marginTop: 24 }} className="df">
                        <div className="f-1">
                            <a href="https://firstcareer.co" className="a" >
                                www.firstcareer.co
                            </a>
                        </div>

                        <a href='mailto:info@firstcareer.co'
                            target='_blank' className='a mr'>Email</a>
                        <a
                            href={"https://wa.me/+918904472228?text=" + encodeURIComponent(`Hi`)}
                            target='_blank' className='a'>WhatsApp</a>
                    </div>
                    <div className="df jcc aic mt-4">
                        <img src='whatsappqr.jpeg' style={{ width: 300, height: 300, borderRadius: 16 }} alt='whatsappqr.jpeg' />
                    </div>
                </div>
            </div>
        </div >
    )
}

