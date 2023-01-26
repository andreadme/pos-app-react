// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const TAX_RATE = 0.12

const ccyFormat = num => {
    return `${num.toFixed(2)}`
}

const TableSpanning = props => {
    // ** Props
    const { rows, grossTotal, vatTotal, netTotal } = props

    return (
        <TableContainer component={Paper}>
            <Table aria-label='spanning table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell align='right'>Qty.</TableCell>
                        <TableCell align='right'>Unit</TableCell>
                        <TableCell align='right'>Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align='right'>{row.quantity}</TableCell>
                        <TableCell align='right'>{row.unit}</TableCell>
                        <TableCell align='right'>{ccyFormat(row.total)}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align='right'>{grossTotal}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Vat</TableCell>
                    <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align='right'>{vatTotal}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Net Total</TableCell>
                    <TableCell align='right' sx={{ fontWeight: 600 }}>{netTotal}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableSpanning