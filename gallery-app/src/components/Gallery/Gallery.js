// Dependancies
import React, { useEffect, useRef, useState, useCallback } from 'react';

import { gsap } from '../../gsap/src';
import { Draggable } from '../../gsap/src/Draggable';
import { ScrollToPlugin } from '../../gsap/src/ScrollToPlugin';

// Elements
import Slide from './elements/Slide'
import SliderNavigation from './elements/SliderNavigation';

// Styles
import './Gallery.scss';

// Controller
import { fetchAssets } from '../../controllers/api'

// Init Dependancies
gsap.registerPlugin( ScrollToPlugin, Draggable );


const Gallery = () => {
    let [ maxSlides, setMaxSlides ] = useState( 0 );
    let [ slidesData, setSlideData ] = useState( null );
    let [ currentSlide, setCurrentSlide ] = useState( 0 );

    const dragInstance = useRef();
    const slideContainerRef = useRef();
    const slideTimeline = useRef(gsap.timeline({ paused: true }));

    
    // Method to check to move onto the next requested slide
    const iterateSlide = useCallback(( iterator = 1) => {
        let nextSlide = currentSlide + iterator;

        if ( nextSlide < 0 || nextSlide > maxSlides - 1 ) return;
        setCurrentSlide( currentSlide => nextSlide );
    }, [ currentSlide, maxSlides ] );

    const detectDrag = useCallback(( swipeDirection ) => {
        if( swipeDirection === 'left' ) {
            iterateSlide();
        } else if ( swipeDirection === 'right' ) {
            iterateSlide( -1 );
        }
    }, [ iterateSlide ]);


    // Animate Slide on scroll or swipe 
    const animateSlide = ( currentSlide ) => {        
        let offsetLeft = slideContainerRef.current.children[ currentSlide ].offsetLeft;
        slideTimeline.current.to( slideContainerRef.current, 
            { 
                duration: 0.5, 
                ease: 'power4.InOut',
                scrollTo: {
                    x: offsetLeft
                },
            }
        ).play();
    }


    // Call API
    useEffect(() => {
        // Fetch assets from API
        fetchAssets().then( response => { 
            if( response && response.data ) {
                setSlideData( data => response.data.assets );
                setMaxSlides( length => response.data.assets.length )
            }
        })
        .catch( error => {
            console.log( 'error', error )
        });
    }, [] );

    // On Initial Mount, setup Draggable for swipe/touch slider functionality
    useEffect(() => {
        if (!slidesData) return;

        // Proxy Element so element doesn't get dragged
        var proxyElement = document.createElement("div");
        
        // Method to detect the direction of a swipe and move onto next slide
        dragInstance.current = Draggable.create( proxyElement, {
            trigger: slideContainerRef.current,
            type: 'x',
            minimumMovement: 50,
            onDragEnd: function() {
                detectDrag( this.getDirection() );
            }
        });

        return () => { dragInstance.current[0].kill() }

    }, [ slidesData, detectDrag ] );

    // Each time the currentSlide changes, animate to the next slide
    useEffect( () => {
        if (!slidesData) return;

        animateSlide( currentSlide );
    }, [ slidesData, currentSlide ] );

    return (
        <div className='gallery'>
            <div className='slider-container' ref={ slideContainerRef }>
                { slidesData && slidesData.map(( slide, index ) => {
                        return (
                            <Slide 
                                key={ index }
                                src={ slide.url } 
                                alt={ slide.altText }
                            />
                        )
                    })
                }
            </div>

            <SliderNavigation 
                data={ slidesData }
                currentSlide={ currentSlide }
                nextSlide={ iterateSlide }
            />
        </div>
    );
}

export default Gallery;