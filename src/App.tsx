import React, {useState} from 'react';
import './App.css';
import PlayerForm from "./components/PlayerForm";
import ReserveForm from "./components/ReserveForm";

function App() {
    const [selectedComponent, setSelectedComponent] = useState('');

    const handleButtonClick = (componentName: React.SetStateAction<string>) => {
        setSelectedComponent(componentName);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'ReserveForm':
                return <ReserveForm/>;
            case 'PlayerForm':
                return <PlayerForm/>;
            // Add cases for other components here
            default:
                return null;
        }
    };

    return (
        <div>
            <nav className="green darken-4">
                <div className="container">
                    <a href="/" className="brand-logo">
                        <h5>Tennis Reserve</h5>
                    </a>
                </div>
            </nav>
            <div className="container">
                <div className="row center-align">
                    <div className="one-half column">
                        <div className="row" style={{marginTop:'20px'}}>
                            <button className="btn btn-custom" onClick={() => handleButtonClick('ReserveForm')}>Reserve
                                Form
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn btn-custom" onClick={() => handleButtonClick('PlayerForm')}>Player
                                Form
                            </button>
                        </div>
                        {/* Add buttons for other components here */}
                    </div>
                </div>
                <div className="row">
                    <div className="one-half column">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
