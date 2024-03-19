import React, { useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import axios from 'axios';

interface Reservation {
    player1: string;
    player2: string;
    dateToPlay: string;
    turn: string;
    court: string;
}

const ReserveListForm: React.FC = () => {
    const [data, setData] = useState<Reservation[]>([]);

    useEffect(() => {
        axios.get<Reservation[]>('http://localhost:3500/court-reserves')
            .then(response => {
                setData(response.data);
                console.log('Data:', response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns: Column<Reservation>[] = React.useMemo(
        () => [
            {
                Header: 'Date to Play',
                accessor: 'dateToPlay',
            },
            {
                Header: 'Turn',
                accessor: 'turn',
            },
            {
                Header: 'Court',
                accessor: 'court',
            },
            {
                Header: 'Player 1',
                accessor: 'player1',
            },
            {
                Header: 'Player 2',
                accessor: 'player2',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Reservation>({ columns, data });

    return (
        <div className="container">
            <table {...getTableProps()} className="highlight">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ReserveListForm;
