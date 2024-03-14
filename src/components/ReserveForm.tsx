import React, {useState, useEffect, FormEvent, Fragment, ChangeEventHandler} from 'react';
import axios from 'axios';

interface ReserveFormData {
    court: String;
    player1: string;
    player2: string;
    dateToPlay: Date;
    turn: string;
}

const ReserveForm: React.FC = () => {
    const [formData, setFormData] = useState<ReserveFormData>({
        court: '',
        player1: '',
        player2: '',
        dateToPlay: new Date(),
        turn: ''
    });
    const [playerList, setPlayerList] = useState<string[]>([]);
    const [courtList, setCourtList] = useState<string[]>([]);
    const [turnList, setTurnList] = useState<string[]>([]);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);

    useEffect(() => {
        fetchTurnsOptions();
        fetchCourtOptions();
        fetchPlayerList();
    }, []);

    const fetchCourtOptions = async () => {
        try {
            const response = await axios.get('https://tennis-app-backend-n8w2.onrender.com/court/courts');
            console.log('Court List:', response.data);
            setCourtList(response.data);
        } catch (error) {
            console.error('Error fetching court number options:', error);
        }
    };

    const fetchTurnsOptions = async () => {
        try {
            const response = await axios.get('https://tennis-app-backend-n8w2.onrender.com/turn/turns');
            console.log('turn List:', response.data);
            setTurnList(response.data);
        } catch (error) {
            console.error('Error fetching court number options:', error);
        }
    };

    const fetchPlayerList = async () => {
        try {
            const response = await axios.get('https://tennis-app-backend-n8w2.onrender.com/register/names');
            console.log('Player list:', response.data);
            setPlayerList(response.data);
        } catch (error) {
            console.error('Error fetching player list:', error);
        }
    };

    const handleCourtChange = (selectedOption: any) => {
        setFormData(prevState => ({
            ...prevState,
            court: selectedOption.value
        }));
    };

    const handleTurnChange = (selectedOption: any) => {
        setFormData(prevState => ({
            ...prevState,
            turn: selectedOption.value
        }));
    };

    const handlePlayer1Change = (selectedOption: any) => {
        setFormData(prevState => ({
            ...prevState,
            player1: selectedOption.value
        }));
    };

    const handlePlayer2Change = (selectedOption: any) => {
        setFormData(prevState => ({
            ...prevState,
            player2: selectedOption.value
        }));
    };

    const handleDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        // Convert the string value to a Date object if needed
        const date = new Date(value);
        setFormData(prevState => ({
            ...prevState,
            dateToPlay: date
        }));
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className="container">
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Court:</label>
                    <div className="col-sm-10">
                        <select
                            value={String(formData.court)}
                            onChange={handleCourtChange}
                            className="browser-default"
                            required
                        >
                            <option value="" disabled>Select Court Number</option>
                            {courtList.map(court => (
                                <option key={court} value={court}>{court}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Player 1:</label>
                    <div className="col-sm-10">
                        <select
                            value={formData.player1}
                            onChange={handlePlayer1Change}
                            className="browser-default"
                            required
                        >
                            <option value="" disabled>Select Player 1</option>
                            {playerList.map(player => (
                                <option key={player} value={player}>{player}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Player 2:</label>
                    <div className="col-sm-10">
                        <select
                            value={formData.player2}
                            onChange={handlePlayer2Change}
                            className="browser-default"
                            required
                        >
                            <option value="" disabled>Select Player 2</option>
                            {playerList.map(player => (
                                <option key={player} value={player}>{player}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Date to Play:</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            value={formData.dateToPlay.toISOString().split('T')[0]}
                            onChange={handleDateChange}
                            className="form-control"
                            min={today.toISOString().split('T')[0]} // Set minimum date to today
                            max={tomorrow.toISOString().split('T')[0]} // Set maximum date to tomorrow
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Turn:</label>
                    <div className="col-sm-10">
                        <select
                            value={formData.turn}
                            onChange={handleTurnChange}
                            className="browser-default"
                            required
                        >
                            <option value="" disabled>Select Turn</option>
                            {turnList.map(turn => (
                                <option key={turn} value={turn}>{turn}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn green darken-4">TRY RESERVE</button>
                        <a href="/" className="btn green darken-4" style={{marginLeft: '30px'}}>CANCEL</a>
                    </div>
                </div>
            </form>
        </Fragment>


    );
};

export default ReserveForm;
