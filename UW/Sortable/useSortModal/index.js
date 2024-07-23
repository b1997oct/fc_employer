import React, { useState } from 'react'
import Sortable from '@/UW/Sortable'
import ModalTitle from '@/UW/Modal/ModalTitle'
import Modal from '@/UW/Modal'
import ModalFooter from '@/UW/Modal/ModalFooter'
import { green_btn, orange_btn } from '@/UW/Button/colors'
import { PUT } from '@upgradableweb/client'
import ModalBody from '@/UW/Modal/ModalBody'
import Tggr from '@/UW/JS/Trigger'
import FooterButtons from '@/UW/Modal/FooterButtons'

export default function useSortModal(url, onResponse) {


    const [sort, setSort] = useState(),
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        SortModal = ({ title, children }) => <Modal open={sort} onClose={!loading && setSort}>
            <ModalTitle onClose={!loading && setSort}>
                <h3>{title}</h3>
            </ModalTitle>
            <ModalBody className='p mb'>
                <Sortable value={sort} onChange={setSort} className='df gap fww jcc' >
                    {children}
                </Sortable>
            </ModalBody>
            <ModalFooter>
                <FooterButtons
                    error={error}
                    disabled={loading}
                    onCancel={Tggr(setSort)}
                    onSubmit={submit}
                />
            </ModalFooter>
        </Modal>

    function submit() {
        setError()
        const onError = err => setError(err.message),
            onRes = res => {
                onResponse(res)
                setSort()
            }
        PUT(url, { data: sort }, { onResponse: onRes, setLoading, onError })
    }


    return { SortModal, setSort, sort }

}