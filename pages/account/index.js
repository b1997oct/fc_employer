import AccountForm from '@/PagesComponents/Account/AccountForm';
import Link from 'next/link';

export default function Page() {
    return (
        <div style={{ background: '#66f1' }}>
            <div className='df jcc aic scroll'>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <p className='tac fs1 '>Employer Account</p>
                    <AccountForm />
                    <div className='df jce aic gap'>
                        <p>Already have account ?</p>
                        <Link href='/login' className='a'>
                            Login
                        </Link>
                    </div>

                </div>
            </div>
        </div >
    )
}

