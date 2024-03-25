import React, {useState, ChangeEvent, FormEvent, Fragment, useRef} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface FormData {
    namePlayer: string;
    email: string;
    celular: string;
    pwd: string;
    retypePwd: string;
}

const PlayerForm: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const initialFormData: FormData = {
        namePlayer: '',
        celular: '',
        email: '',
        pwd: '',
        retypePwd: ''
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [generateLoading, setGenerateLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const isPasswordFocused = useRef(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error messages when focusing on input fields
        setEmailError(null);
        if (passwordInputRef.current && isPasswordFocused.current) {
            setPasswordError(null);
        }
    };
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (): boolean => {
        if (formData.pwd !== formData.retypePwd) {
            setPasswordError('Passwords do not match!');
            setFormData(prevState => ({
                ...prevState,
                pwd: '',
                retypePwd: ''
            }));
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
            }
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const clearForm = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGenerateLoading(true);
        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email');
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
            setGenerateLoading(false);
            return;
        }
        if (!validatePassword()) {
            setGenerateLoading(false);
            return;
        }
        const formDataToSend = (({retypePwd, ...rest}) => rest)(formData);
        setEmailError(null);
        try {
            const response = await axios.post(`${apiUrl}/register`, formDataToSend);
            console.log('Response:', response.data);
            if (response.data.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                });
                setGenerateLoading(false);
                return;
            }
            Swal.fire({
                icon: 'success',
                title: 'Player created successfully!',
            });
            clearForm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
            console.error('Failed to submit form:', error);
        }
        setGenerateLoading(false);
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
                           required />
                    <label>Cellular </label>
                    <input type="text"
                           name="celular"
                           className="u-full-width"
                           placeholder="+56912345678"
                           onChange={handleChange}
                           value={formData.celular}
                           required />
                    <label>Email:</label>
                    <input type="email"
                           name="email"
                           className="u-full-width"
                           placeholder="Email"
                           value={formData.email}
                           onChange={handleChange}
                           ref={emailInputRef}
                           required />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <label>Password:</label>
                    <input type={'password'}
                           name="pwd"
                           value={formData.pwd}
                           onChange={handleChange}
                           ref={passwordInputRef}
                           required />
                    <label>Retype Password:</label>
                    <input type={'password'}
                           name="retypePwd"
                           value={formData.retypePwd}
                           onChange={handleChange}
                           required />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div style={{ marginTop: '15px' }}>
                    <button type="submit" className="btn green darken-4" disabled={generateLoading}>
                        {generateLoading && <FontAwesomeIcon icon={faSpinner} spin fixedWidth />}Generate Player
                    </button>
                    <a href="/" className="btn green darken-4" style={{ marginLeft: '30px' }}>CANCEL</a>
                </div>
            </form>
        </Fragment>
    );
};

export default PlayerForm;
