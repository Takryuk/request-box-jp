import React from 'react';

const createMultiline = (sentence)=>{
    return (
        <React.Fragment>
            {sentence?
            sentence.split("\n").map((i,key) => {
            return  (<>{i}<br/></>);
            }):''}
        </React.Fragment>
    );
}

export default createMultiline;


// export const fetchVideos;
// export const listOfVideos;



