// Dependancies
import React from 'react';

// Elements


// Styles
import './Gallery.scss';

const Gallery = () => {

    const slides_data = [
        { src: '/assets/images/img01.png', alt: 'Slider 1'},
        { src: '/assets/images/img02.png', alt: 'Slider 2'},
        { src: '/assets/images/img03.png', alt: 'Slider 3'},
        { src: '/assets/images/img04.png', alt: 'Slider 4'},
    ];

    return (
        <div className='gallery'>
            <div className='slider-container'>
                { slides_data &&
                    slides_data.map(( slide, index ) => {
                        return (
                            <img 
                                key={ index }
                                className='slide'
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
                            return <div key={ index } className='dots'></div>
                        })
                    }
                </div>
                <div className='arrows'>
                    <div className='arrow arrow--left'></div>
                    <div className='arrow arrow--right'></div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;