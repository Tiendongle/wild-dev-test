// Dependancies
import React from 'react';

// Elements


// Styles

const Slide = ({ src, alt }) => {

    return (
        <div className='img-wrapper'>
            <img 
                // className='slide'
                src={ src } 
                alt={ alt }
            />
        </div>
    );
}

export default Slide;