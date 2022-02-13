import React from 'react'
import {fontFamily, fontColor} from '../css/css';
import CreateMultiline from '../utils/CreateMultiline';


const Item = ({merchandise}) => {

    return (
        <div>
            <div 
                style={{
                    fontFamily:fontFamily.body,
                    border: "1px solid rgba(146, 146, 146, 0.55)",
                    borderRadius: 8,
                    padding:10,
                    color:fontColor.body,
                }}
            >
                <div
                    style={{
                        marginBottom:10, 
                        fontSize:11,
                    }}
                >
                    {merchandise.created_at}
                </div>
                <div
                    style={{
                        fontSize:18,
                    }}
                >
                    {CreateMultiline(merchandise.message)}
                </div>
            </div> 
        </div>
)
}

export default Item
