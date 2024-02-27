    import React from 'react';
    import styled from '@emotion/styled';

    interface NumberControlProps {
    value: number;
    onChange:(n:number)=>void
    }

    // Styled Components for customization if needed
    const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    `;

    const DecreaseButton = styled.button`
    /* Customize appearance here */
    background-color: gray;
    border: 1;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    `;

    const IncreaseButton = styled(DecreaseButton)`
    /* Customize appearance here */
    &:hover {
        background-color: #eee;
    }
    `;

    export default function NumberControl({ value,onChange }: NumberControlProps): JSX.Element {
    const handleIncreaseClick = () => {
        const updatedValue = value + 1;
        onChange(updatedValue);
    };

    const handleDecreaseClick = () => {
        const updatedValue = Math.max(value - 1, 0);
        onChange(updatedValue);
    };

    return (
        <>
        <ButtonContainer>
            <DecreaseButton onClick={handleDecreaseClick} className='rounded-full '>-</DecreaseButton>
            <input
            type='number'
            style={{ width: '70px', textAlign: 'center' }}
            value={value}
            readOnly
            />
            <IncreaseButton onClick={handleIncreaseClick} className='rounded-full'>+</IncreaseButton>
        </ButtonContainer>
        </>
    )
    }
