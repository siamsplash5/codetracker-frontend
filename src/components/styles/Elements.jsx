/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const MainHeader = styled.header`
    padding: 0 4.8rem;
    height: 6rem;
    font-size: 1.8rem;
    background-color: ${({ theme }) => theme.colors.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        height: auto;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 80%;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const FormField = styled.input`
    margin-bottom: 10px;
    padding: 5px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    cursor: pointer;
`;

export const OutlineButton = styled.button`
    padding: 10px 20px;
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.btn};
    cursor: pointer;
`;

export const ErrorMessage = styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.error};
    padding: 1rem;
`;
