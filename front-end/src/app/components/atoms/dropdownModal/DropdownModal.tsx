'use client'

import Image from "next/image";
import { useEffect, useState } from "react"

//This component is just a visual flare to keep the user invested in waiting. Most of the time you won't see it for long.
const DropdownModal = () => {

    const [loadText, setLoadText] = useState("Loading. ")

    function changeText(){
        loadText.length >= 12 ? setLoadText("Loading") : setLoadText(loadText + ". ");
    }

    useEffect(() => {
        
        setTimeout(changeText, 400);

    }, [loadText])
    

    return (
      <div className='flex place-content-center gap-3 items-center border-b-4 w-full border-stone-500/25 duration-100 min-h-10 cursor-progress hover:bg-stone-500/10'>
        <Image 
        className=" size-5 animate-spin ..." 
        src='/loading-svgrepo-com.svg'
        alt="load icon"           
        width={18}
        height={18}/>
        <p className=' text-gray-500 text-left w-32 font-medium'>{loadText}</p>
      </div>
    )
}

export default DropdownModal

//Regardless, I'm quite proud on how it looks.