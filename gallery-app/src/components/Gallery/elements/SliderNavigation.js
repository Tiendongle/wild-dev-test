// Dependancies
import React from 'react';
import classnames from 'classnames';

// Elements


// Styles
import './SliderNavigation.scss';

const SliderNavigation = ({ data, currentSlide, nextSlide }) => {
    return(
        <div className='slider-navigation'>
            <div className='slider-dots'>
                { data &&
                    data.map(( slide, index ) => {
                        return <div 
                            key={ index } 
                            className={ classnames(
                                'dots', 
                                {
                                    active: index - 1 < currentSlide
                                }
                            )}
                        ></div>
                    })
                }
            </div>
            <div className='arrows'>
                <div 
                    className={ classnames(
                        'arrow arrow--left', 
                        {
                            disabled: currentSlide <= 0
                        }
                    )}
                    onClick={ () => { nextSlide( -1 ) }}
                >
                </div>
                <div 
                    className={ classnames(
                        'arrow arrow--right',
                        { 
                            disabled: currentSlide >= data.length - 1
                        }
                    )}
                    onClick={ () => { nextSlide() }}
                ></div>
            </div>
        </div>
    )
}

export default SliderNavigation;