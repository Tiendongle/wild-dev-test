// Dependancies
import React, { useRef, useState } from 'react';

import { gsap } from '../../gsap/src';
import { ScrollToPlugin } from '../../gsap/src/ScrollToPlugin';

// Elements
import Slide from './elements/Slide'

// Styles
import './Gallery.scss';

// Init
gsap.registerPlugin( ScrollToPlugin );

const Gallery = () => {

    const slides_data = [
        { src: '/assets/images/img01.png', alt: 'Slider 1'},
        { src: '/assets/images/img02.png', alt: 'Slider 2'},
        { src: '/assets/images/img03.png', alt: 'Slider 3'},
        { src: '/assets/images/img04.png', alt: 'Slider 4'},
    ];

    const galleryRef = useRef();
    let [ currentSlide, setCurrentSlide ] = useState( 0 );
    let maxSlides = slides_data.length;

    const nextSlide = ( iterator = 1) => {
        let nextSlide = currentSlide + iterator;
        if ( nextSlide < 0 || nextSlide > maxSlides - 1 ) return;

        // console.log( 'nextSlide', nextSlide, [ ...galleryRef.current.children ][ nextSlide ].offsetLeft );

        setCurrentSlide( nextSlide );
        galleryRef.current.scroll({ left: [ ...galleryRef.current.children ][ nextSlide ].offsetLeft });

        // console.log('currentSlide', currentSlide );
    };

    return (
        <div className='gallery'>
            <div className='slider-container' ref={ galleryRef }>
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
                        onClick={ ( event ) => { 
                            // console.log( 'Left Arrow', event, galleryRef );
                            nextSlide( -1 );
                        }}
                    >
                    </div>
                    <div 
                        className='arrow arrow--right'
                        onClick={ ( event ) => { 
                            // console.log( 'Right Arrow', event, galleryRef );
                            nextSlide();
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;