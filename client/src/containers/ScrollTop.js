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
        {visible ?              
            <div onClick={scrollToTop} title="back to top">
                <i className="fas fa-arrow-up"></i>
            </div> : null}

        </div>
    )
}

export default ScrollTop
