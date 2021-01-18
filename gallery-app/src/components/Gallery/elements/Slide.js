// Dependancies
import React from 'react';

// Elements


// Styles

const Slide = ({ src, alt }) => {

    return (
        <img 
            className='slide'
            src={ src } 
            alt={ alt }
        />
    );
}

export default Slide;