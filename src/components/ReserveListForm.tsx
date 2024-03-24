import React, { useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import axios from 'axios';
import moment from "moment";

interface Reservation {
    player1: string;
    player2: string;
    dateToPlay: string;
    turn: string;
    court: string;
}

const ReserveListForm: React.FC = () => {
    const [data, setData] = useState<Reservation[]>([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Reservation[]>(`${apiUrl}/court-reserves`);
                if (response.data.length === 0) {
                    console.log('No data found.');
                } else {
                    const formattedData = response.data.map(item => ({
                        ...item,
                        dateToPlay: moment(item.dateToPlay).format('YYYY-MM-DD')
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        //eslint-disable-next-line
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
