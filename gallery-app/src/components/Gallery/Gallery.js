// Dependancies
import React, { useEffect, useRef, useState, useCallback } from 'react';

import { gsap } from '../../gsap/src';
import { ScrollToPlugin } from '../../gsap/src/ScrollToPlugin';
import { Draggable } from '../../gsap/src/Draggable';

// Elements
import Slide from './elements/Slide'

// Styles
import './Gallery.scss';

// Init Dependancies
gsap.registerPlugin( ScrollToPlugin, Draggable );

const Gallery = () => {

    // Test Data
    const slides_data = [
        { src: '/assets/images/img01.png', alt: 'Slider 1'},
        { src: '/assets/images/img02.png', alt: 'Slider 2'},
        { src: '/assets/images/img03.png', alt: 'Slider 3'},
        { src: '/assets/images/img04.png', alt: 'Slider 4'},
    ];
    let maxSlides = slides_data.length;

    let [ currentSlide, setCurrentSlide ] = useState( 0 );
    const slideContainerRef = useRef();
    const dragInstance = useRef();

    const slideTimeline = useRef(gsap.timeline({
        paused: true
    }));
    
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

    // On Initial Mount, setup Draggable for swipe/touch slider functionality
    useEffect(() => {

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

    }, [ detectDrag ]);

    // Each time the currentSlide changes, animate to the next slide
    useEffect( () => {
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
    }, [ currentSlide ]);

    return (
        <div className='gallery'>
            <div className='slider-container' ref={ slideContainerRef }>
                { slides_data &&
                    slides_data.map(( slide, index ) => {
                        return (
                            <Slide 
                                key={ index }
                                src={ slide.src } 
                                alt={ slide.alt }
                            />
                        )
                    })
                }
            </div>
            <div className='slider-navigation'>
                <div className='slider-dots'>
                    { slides_data &&
                        slides_data.map(( slide, index ) => {
                            return <div key={ index } className={ ( index - 1 < currentSlide ) ? 'dots active' : 'dots' }></div>
                        })
                    }
                </div>
                <div className='arrows'>
                    <div 
                        className='arrow arrow--left'
                        onClick={ () => { iterateSlide( -1 ) }}
                    >
                    </div>
                    <div 
                        className='arrow arrow--right'
                        onClick={ () => { iterateSlide() }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;