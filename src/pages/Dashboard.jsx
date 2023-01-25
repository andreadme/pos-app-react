// ** MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid'

// ** React Imports
import { useState } from 'react'

const Dashboard = () => { 
    // ** States
    const [selectedItem, setSelectedItem] = useState("")
    const handleOrder = event => {
        console.log(event.target.value)
        setSelectedItem(event.target.value)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
                <Button onClick={e => handleOrder(e)} value="apples" variant='contained'
                    sx={{ border: selectedItem === 'apples' ? ''}}>
                    Apples
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button onClick={e => handleOrder(e)} value="oranges" variant='contained'>
                    Oranges
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button onClickO={e => handleOrder(e)} value="lemons" variant='contained'>
                    Lemons
                </Button>
            </Grid>
        </Grid>
    )
} 

export default Dashboard