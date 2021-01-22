// Dependancies
import React from 'react';

// Elements


// Styles
import './SliderNavigation.scss';

const SliderNavigation = ({ data, currentSlide, nextSlide }) => {
    return(
        <div className='slider-navigation'>
            <div className='slider-dots'>
                { data &&
                    data.map(( slide, index ) => {
                        return <div key={ index } className={ ( index - 1 < currentSlide ) ? 'dots active' : 'dots' }></div>
                    })
                }
            </div>
            <div className='arrows'>
                <div 
                    className='arrow arrow--left'
                    onClick={ () => { nextSlide( -1 ) }}
                >
                </div>
                <div 
                    className='arrow arrow--right'
                    onClick={ () => { nextSlide() }}
                ></div>
            </div>
        </div>
    )
}

export default SliderNavigation;