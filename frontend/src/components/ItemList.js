import React from 'react'
import Item from './Item';
import {
    Grid
} from '@material-ui/core';

const ItemList = ({merchandises}) => {
    const listOfMerchandises = merchandises?merchandises.map((merchandise)=>{
        return(
            <Grid item>
                <Item 
                    key={merchandise.id}
                    merchandise={merchandise}
                />
            </Grid>
        )
    }):null


    return (
        <div>
            <Grid container direction="column" spacing={2}>
                {listOfMerchandises}
            </Grid>
        </div>
    )
}

export default ItemList
