import React from 'react'
import Link from "next/link";
import MosaicraUiSidebar from '@/components/Mosaicra/MosaicraUiSidebar'

const MosaicraUiLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen ">
            <div className="flex w-full space-x-24 lg:space-x-0 sxl:gap-16 ">

                {/* side menu */}

                <MosaicraUiSidebar />
                <div className={` text-sm w-full !m-0 overflow-hidden`} >
                    <div className="flex flex-col m-4">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MosaicraUiLayout