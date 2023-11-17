import React, { useEffect, useRef } from 'react'
import loading from '@asset/quizcar/loading.json'
import lottie from 'lottie-web'


const Loading = () => {

    const container = useRef(null)

    useEffect(() => {
        if(container.current){
            lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: loading,
            });
        }
    }, []);
  return (
    <div className='w-full h-full'>
            <div  ref={container}></div>
        </div>
  )
}

export default Loading