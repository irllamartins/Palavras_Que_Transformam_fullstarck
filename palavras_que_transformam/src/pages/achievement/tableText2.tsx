import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper
} from '@mui/material';

// Função para criar dados
function createData(name: string, date: Date, update: Date) {
    return { name, date, update };
}

// Dados da tabela
const rows = [
    createData('Evento A', new Date('2023-01-01'), new Date('2023-01-01')),
    createData('Evento B', new Date('2022-12-01'), new Date('2023-01-01')),
    createData('Evento C', new Date('2023-05-20'), new Date('2024-01-01')),
    createData('Evento D', new Date('2021-08-15'), new Date('2025-01-01')),
    createData('Evento E', new Date('2023-01-01'), new Date('2025-01-01')),
    createData('Evento F', new Date('2022-12-01'), new Date('2023-01-01')),
    createData('Evento G', new Date('2023-05-20'), new Date('2025-01-01')),
    createData('Evento H', new Date('2021-08-15'), new Date('2023-01-01')),
    createData('Evento I', new Date('2023-01-01'), new Date('2023-01-01')),
    createData('Evento J', new Date('2022-12-01'), new Date('2024-01-01')),
    createData('Evento C', new Date('2023-05-20'), new Date('2023-01-01')),
    createData('Evento D', new Date('2021-08-15'), new Date('2022-01-01')),
];

// Comparador para ordenação
function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: 'asc' | 'desc', orderBy: string) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export default function SortableTable() {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRows = rows.slice().sort(getComparator(order, orderBy));
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Evento
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'date' ? order : undefined}>
                            <TableSortLabel
                                active={orderBy === 'date'}
                                direction={orderBy === 'date' ? order : 'asc'}
                                onClick={(e) => handleRequestSort(e, 'date')}
                            >
                                Data de Criação
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'update' ? order : undefined}>
                            <TableSortLabel
                                active={orderBy === 'update'}
                                direction={orderBy === 'update' ? order : 'asc'}
                                onClick={(e) => handleRequestSort(e, 'update')}
                            >
                                Data de atualização
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.date.toLocaleDateString()}</TableCell>
                            <TableCell>{row.update.toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
