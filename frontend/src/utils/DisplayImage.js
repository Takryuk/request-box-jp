import React from 'react'

const DisplayImage = ({src, aspectRatio, id, width, maxWidth, style}) => {
    return (
        <div 
            style={{
                width: "100%",
                height: "auto",
            }}
        >
        <img
            // onLoad={handleImageLoad}
            // id="output"
            id={id}
            src={src?src:null}

            // ref={imageRef}
            style={{
                ...style,
                display:"block",
                aspectRatio: aspectRatio?aspectRatio:"1/0.625",
                width:width?width:"100%",
                maxWidth:maxWidth?maxWidth:null,
                top:0,
                objectFit: 'cover',
            }}
            alt=""
        />
    </div>    )
}

export default DisplayImage
