import React, {useState, useEffect} from 'react'

const ScrollTop = () => {
    
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", toggleVisivility)
    }, [])

    const toggleVisivility = () => {
        if(window.pageYOffset > 300) {
            setVisible(true)
        }else {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="scroll-to-top"> 
        {visible ?              <div onClick={scrollToTop}>
                <img src='https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png' alt='Go to top'/>
            </div> : null}

        </div>
    )
}

export default ScrollTop
