import axios from "axios";
import { useState } from "react";
import styled from 'styled-components';
import {
    Button, ErrorMessage, Form,
    FormField,
    ModalContent,
    ModalOverlay,
    OutlineButton
} from '../styles/Elements';

const ButtonContainer = styled.div`
    display: grid;
    gap: 1rem;
`;

export default function LoginModal({ isOpen, onClose, setUserName }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = async () => {
            try {
                const { data } = await axios.post(
                    "/api/login",
                    {
                        username,
                        password,
                    },
                    { withCredentials: true }
                );
                if (data === "SUCCESS") {
                    setUsername("");
                    setPassword("");
                    setUserName(username);
                    onClose();
                } else {
                    setErrorMessage(data);
                    setShowError(true);
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        login();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <FormField
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ButtonContainer>
                        <Button type="submit">Submit</Button>
                        <OutlineButton type="submit">
                            Forgot Password?
                        </OutlineButton>
                        <Button type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}
