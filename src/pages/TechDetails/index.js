import React from 'react';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items:center;
    background-color: #f5f5f5;
`;

const Title = styled.View`
    font-size: 24px;
    text-align: center;
    margin: 10px;
`;

export default function TechDetails(){

    const route = useRoute();

    const {tech} = route.params;

    return(
        <Container>
            <Title>{tech.id}</Title>
        </Container>
    );
}

