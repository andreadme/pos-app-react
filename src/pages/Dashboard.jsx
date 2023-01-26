// ** MUI Imports
import { FormHelperText, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

// ** React Imports
import { useEffect, useState } from 'react'
import TableSpanning from 'src/components/tables/TableSpanning'

// ** Util Imports
import { hexToRGBA } from 'src/helpers/hex-to-rgba'

const items = [
    {
        id: 1, 
        name: 'apples',
        value: 29.99,
    },
    {
        id: 2, 
        name: 'oranges',
        value: 35.00,
    },
    {
        id: 3, 
        name: 'lemons',
        value: 40.00,
    }
]

const numbers = [
    {
        id: 1,
        value: 1,
    },
    {
        id: 2,
        value: 2,
    },
    {
        id: 3,
        value: 3,
    },
    {
        id: 4,
        value: 4,
    },
    {
        id: 5,
        value: 5,
    },
    {
        id: 6,
        value: 6,
    },
    {
        id: 7,
        value: 7,
    },
    {
        id: 8,
        value: 8,
    },
    {
        id: 9,
        value: 9,
    },
    {
        id: 0,
        value: 0,
    },
]

const TAX_RATE = 0.12

// ** Styled component for the link in the dataTable
const ButtonStyled = styled(Button)(({ bgColor }) => ({
    backgroundColor: bgColor,
    color: 'black',
    lineHeight: 1,
    width: '100px',
    height: '40px',
    padding: '0.5rem',
    marginRight: '1rem',
    '&:hover': {
        backgroundColor: hexToRGBA(bgColor, 0.8)
    }
}))

const Dashboard = () => { 
    // ** States
    const [selectedItem, setSelectedItem] = useState('')
    const [selectedItemVal, setSelectedItemVal] = useState(null)
    const [selectedQty, setSelectedQty] = useState([])
    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState('')
    const [grossTotal, setGrossTotal] = useState(0)
    const [vatTotal, setVatTotal] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [itemCnt, setItemCnt] = useState(0)

    const handleItem = (event, index) => {
        setSelectedItem(items[index].name)
        setSelectedItemVal(event.target.value)
    }

    const handleQty = event => { 
        if (selectedQty.length < 5) {
            setSelectedQty(existingNum => [...existingNum, event.target.value])
        } else {
            setErrors('Maximum allowed digits is 5.')
        }
    }

    const onSubmit = () => {
        setErrors('')
        if (!selectedItem || selectedQty.length <= 0) {
            return setErrors('You need to fill out both the item and quantity.')
        }

        const newItem = {
            id: itemCnt,
            name: selectedItem,
            quantity: parseInt(selectedQty),
            unit: selectedItemVal,
            total: selectedItemVal * parseInt(selectedQty),
        }

        setOrders(existingItems => [...existingItems, newItem])
        setItemCnt(prevCnt => prevCnt + 1)
        onClearSelected()
    }

    const onClearSelected = () => {
        setSelectedItem('')
        setSelectedItemVal(null)
        setSelectedQty([])
        setErrors('')
    }

    const onClearAll = () => {
        setSelectedItem('')
        setSelectedItemVal(null)
        setSelectedQty([])
        setOrders([])
        setErrors('')
        setGrossTotal(0)
        setVatTotal(0)
        setNetTotal(0)
        setItemCnt(0)
    }

    const handleTotal = () => {
        if (orders.length > 0) {
            const sum = orders.map(order => order.total).reduce((a, b) => a + b)
            setGrossTotal(roundTwoDecimal(sum))
            const net = calculateNetTotal(sum, TAX_RATE)
            setNetTotal(roundTwoDecimal(net))
        }
    }

    const calculateNetTotal = (grossTotal, tax) => {
        let product = grossTotal*tax
        setVatTotal(roundTwoDecimal(product))
        return grossTotal + product
    }

    const roundTwoDecimal = num => {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    let string = ''
    const handleQuantity = () => {
        const temp = [...selectedQty]
        if (temp.length > 0) {
            string = temp.join('')
            setSelectedQty(String(string))
            return string
        }
    }

    useEffect(() => {
        handleTotal()
    }, [orders])

    useEffect(() => {
        handleQuantity()
    }, [selectedQty])

    return (
        <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem', marginTop: '3rem', marginBottom: '3rem'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <TableSpanning 
                                rows={orders}
                                grossTotal={grossTotal}
                                netTotal={netTotal}
                                vatTotal={vatTotal}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item container md={6} spacing={2}>
                    <Grid item xs={12}><Typography variant='h4' color='black'>{selectedQty}</Typography></Grid>
                    <Grid container item xs={6} columnSpacing={2}>
                        {
                            numbers &&
                            numbers.map((item, idx) => (
                                <Grid item xs={4} key={item.id}>
                                    <Button key={item.id} onClick={e => handleQty(e)} value={item.value} variant='outlined'
                                        sx={{ border: parseInt(selectedQty) === item.value ? '2px solid black' : '' }}>
                                        {item.value}
                                    </Button>
                                </Grid>
                            ))
                        }
                    </Grid>

                    <Grid container item xs={4} spacing={2}>
                        {
                            items && 
                            items.map((item, idx) => (
                                <Grid item xs={8} key={item.id} sx={{ marginLeft: '3rem' }}>
                                    <Box sx={{ mx: 'auto' }}>
                                        <Button onClick={e => handleItem(e, idx)} value={item.value} variant='contained'
                                            sx={{ width: '100px', border: selectedItem === item.name ? '2px solid black' : '' }}>
                                            {item.name} <br />{item.value}
                                        </Button>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>

                    <Grid item xs={12}>
                    {
                        errors && (
                            <FormHelperText sx={{ color: 'red' }}>
                                {errors}
                            </FormHelperText>
                        )
                    }
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ButtonStyled bgColor='#f4c344' onClick={onClearSelected}>
                            Clear Selected
                        </ButtonStyled>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ButtonStyled bgColor='#ea5255' onClick={onClearAll}>
                            Clear All
                        </ButtonStyled>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ButtonStyled bgColor='#a5c536' onClick={onSubmit}>
                            Enter
                        </ButtonStyled>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
} 

export default Dashboard