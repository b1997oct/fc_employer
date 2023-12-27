import AccountForm from '@/PagesComponents/Account/AccountForm';

export default function Page() {
    return (
        <div style={{ background: '#66f1' }}>
            <div className='df jcc aic h-screen'>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <p className='tac fs1 '>Employer Account</p>
                    <AccountForm />
                </div>
            </div>
        </div >
    )
}

