import React from 'react'

function ErrorPage({ errorMsg }) {
    return (
        <div>
            <p>You Got A Error</p>
            <p>{errorMsg}</p>
        </div>
    )
}

export default ErrorPage;