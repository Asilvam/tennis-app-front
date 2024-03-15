import React, {useState, ChangeEvent, FormEvent, Fragment} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

interface FormData {
    namePlayer: string;
    email: string;
    celular: string;
    pwd: string;
    retypePwd: string;
}

const PlayerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        namePlayer: '',
        email: '',
        celular: '',
        pwd: '',
        retypePwd: ''
    });

    const [emailError,
        setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (): boolean => {
        if (formData.pwd !== formData.retypePwd) {
            setPasswordError('Passwords do not match');
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email');
            return;
        }
        if (!validatePassword()) {
            return;
        }
        const formDataToSend = (({retypePwd, ...rest}) => rest)(formData);
        setEmailError(null);
        try {
            const response = await axios.post<any>('https://tennis-app-backend-n8w2.onrender.com/register', formDataToSend);
            console.log('Form submitted successfully:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Player created successfully!',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name Player:</label>
                    <input type="text"
                           name="namePlayer"
                           className="u-full-width"
                           placeholder="Name Player"
                           value={formData.namePlayer}
                           onChange={handleChange}
                           autoFocus
                           required/>
                    <label>Cellular </label>
                    <input type="text"
                           name="celular"
                           className="u-full-width"
                           placeholder="+56912345678"
                           onChange={handleChange}
                           value={formData.celular}
                           required/>
                    <label>Email:</label>
                    <input type="email"
                           name="email"
                           className="u-full-width"
                           placeholder="Email"
                           value={formData.email}
                           onChange={handleChange}
                           required/>
                    {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                    <label>Password:</label>
                    <input type={'password'}
                           name="pwd"
                           value={formData.pwd}
                           onChange={handleChange}
                           required/>
                    <label>Retype Password:</label>
                    <input type={'password'}
                           name="retypePwd"
                           value={formData.retypePwd}
                           onChange={handleChange}
                           required/>
                </div>
                {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
                <div style={{marginTop: '15px'}}>
                    <button type="submit" className="btn green darken-4">Generate Player</button>
                    <a href="/" className="btn green darken-4" style={{marginLeft: '30px'}}>CANCEL</a>
                </div>
            </form>
        </Fragment>
    );
};

export default PlayerForm;
