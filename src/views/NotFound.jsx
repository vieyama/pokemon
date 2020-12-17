import React from 'react'
import { useHistory } from 'react-router-dom'
import { Result, Button } from 'antd'

const Page404 = () => {
    const history = useHistory()

    const handleRedirect = path => () => history.replace(path)

    return (
        <Result
            status='404'
            title='404'
            subTitle="Halaman tidak ditemukan"
            extra={
                <Button onClick={handleRedirect('/')} type='primary'>
                    Kembali
                </Button>
            }
        />
    )
}

export default Page404
