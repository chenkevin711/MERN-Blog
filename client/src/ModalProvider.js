import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from 'styled-components';
// import { useLocation } from 'react-router-dom';

const ModalContext = createContext({
    openModals: []
})

export const ModalProvider = (props) => {  
    const [openModals, setOpenModals] = useState([])
    const backgroundRef = useRef()
    // const location = useLocation()

    // Opens a modal
    function createModal(component, delay) {
        console.log('Opening...💤', document.getElementById(`Modal ${openModals.length - 1}`))
        if (delay) {
            setTimeout(() => {
                setOpenModals(prev => [...prev, component])
            }, 400)
        } else {
            setOpenModals(prev => [...prev, component])
        }
        
    }

    // Close the most recently opened modal. Generally the top most modal
    async function close() {
        if (openModals.length === 0) {
            return
        }
        console.log('Closing...💤', document.getElementById(`Modal ${openModals.length - 1}`))
        document.getElementById(`Modal ${openModals.length - 1}`).style.transition = 'top 0.5s ease, opacity 0.3s linear, margin-bottom 0.5s ease, height 0.3s ease'
        document.getElementById(`Modal ${openModals.length - 1}`).style.opacity = '0%'
        document.getElementById(`Modal ${openModals.length - 1}`).style.marginBottom = '10%'
        setTimeout(() => {
            setOpenModals(prev => [...prev].slice(0, -1))
        }, 500)
    }

    // Open the next modal. Used when you don't it to look like a new modal is opening and you are just flipping a page
    function openNext(component, animate=false) {
        let modals = openModals

        if (animate) {
            document.getElementById(`Modal ${openModals.length - 1}`).style.transition = 'top 0.5s ease, opacity 0.3s linear, margin-bottom 0.5s ease, height 0.3s ease'
            document.getElementById(`Modal ${openModals.length - 1}`).style.opacity = '0%'
            document.getElementById(`Modal ${openModals.length - 1}`).style.marginBottom = '10%'
            modals = []
            modals.push(component)
            setTimeout(() => {
                setOpenModals(modals)
            }, 500)
        } else {
            modals.push(component)
            setOpenModals(modals.slice(1))
        }
    }
    
    // Close All Modals
    function closeAll() {
        openModals.forEach((modal, index) => {
            document.getElementById(`Modal ${index}`).style.transition = 'top 0.5s ease, opacity 0.3s linear, margin-bottom 0.5s ease, height 0.3s ease'
            document.getElementById(`Modal ${index}`).style.opacity = '0%'
            document.getElementById(`Modal ${index}`).style.marginBottom = '10%'
        })
        setTimeout(() => {
            setOpenModals([])
        }, 500)
    }

    // Close Modals when you navigate away from page
    // useEffect(() => {
    //     setOpenModals([])
    // }, [location]);

    // Close on Outside Click
    function outsideClick() {
        if (!openModals[openModals.length - 1].props.clickOutsideClose) return 
        close()
    }

    useEffect(() => {
        console.log('Opened Modals 🔳', openModals, openModals.length)
    }, [openModals])

    // Style For Gray Overlay
    const backgroundStyles = useMemo(() => {
        return {
        background: "#000",
        opacity: 0.5,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    }}, [])

    // Style For Modal
    const contentStyles = useMemo(() => {
        return {
            display: "flex",
            background: "#FFF",
            overflowY: "auto",
            overscrollBehavior: "contain",
            borderRadius: "6px",
            transition: 'all 0.5s ease, top 0.5s ease, opacity 0.3s linear, margin-bottom 0.5s ease',
            opacity: '0%',
            flexDirection: 'column',
        }
    }, [])

    // Close on ESC
    const onKeyDown = useCallback((event) => {
		if (event.keyCode === 27) {
            if (!openModals[openModals.length - 1].props.escClose) return 
			close()
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [close])

    useEffect(() => {
        if (openModals.length !== 0) {
            document.addEventListener("keydown", onKeyDown)

            return () => {
                document.removeEventListener("keydown", onKeyDown)
            }
        }
    }, [onKeyDown, openModals])

    // Handle Animation for Opening Modals
    useEffect(() => {
        if (openModals.length !== 0) {
            setTimeout(() => {
                if (!document.getElementById(`Modal ${openModals.length - 1}`)) return
                
                document.getElementById(`Modal ${openModals.length - 1}`).style.opacity = '100%'
                document.getElementById(`Modal ${openModals.length - 1}`).style.marginBottom = '0px'
            }, 0)
        }
        
    }, [openModals])
    
    return (
        <ModalContext.Provider value={{ createModal, close, openModals, openNext, closeAll }}>
            {props.children}
            {openModals.length > 0 ? 
            <div style={{position: 'fixed', zIndex: '1000', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {openModals.map((component, index) => {
                    return ([
                        <Modal id={`Modal ${index}`} style={{...contentStyles, position: 'absolute', zIndex: index + 1, maxHeight: '90vh', marginBottom: '10%', width: 'fit-content', ...component.props.style}}>
                            {component}
                        </Modal>,
                        <div 
                            id={`Modal ${index} GrayOverlay`}
                            ref={backgroundRef} 
                            style={{...backgroundStyles, zIndex: index}} 
                            onClick={ () => outsideClick() } />
                        ]
                    )
                })}
            </div> 
            :
            null
            }
            
        </ModalContext.Provider>
    )
};

const Modal = styled.div`
    width: 820px;
	height: auto;
    background: #FFFFFF;
    border-radius: 6px;
    h3 {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: #293241;
        text-align: center;
        margin-top: 8px;
        margin-bottom: -4px;
    }
    h2 {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 150%;
        color: #293241;
        margin-top: 5px;
    }
    h1 {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        color: #293241;
    }
`;

export const useModalProvider = () => useContext(ModalContext)