import React from 'react'
import Header from 'layouts/Header'

const Layouts = (props) => {
    const { children } = props
    return (
        <div className="main-container">
            <Header />
            {children}
        </div>
    )
}

export default Layouts
