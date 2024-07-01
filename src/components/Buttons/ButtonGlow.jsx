import Link from 'next/link'
import React from 'react'

const ButtonGlow = ({text, href}) => {
    return (
        <>
            <Link href={href}>
                <button className="button-glow text-xs">
                    {text}
                </button>
            </Link>
        </>
    )
}

export default ButtonGlow