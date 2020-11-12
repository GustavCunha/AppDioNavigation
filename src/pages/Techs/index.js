import React, { useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import { 
    Container, 
    Form, 
    Input,
    List,
    Name,
    ProfileButton,
    SubmitButton,
    Tech,
} from './styles';

import api from '../../services/api';

export default function Techs() {
    const [loading, setLoading] = useState(false);
    const [techs, setTechs] = useState([]);
    const [newTech, setNewTech] = useState(null);

    const navigation = useNavigation();

    async function handleAddTech(){
        setLoading(true);
        try{
            const {data} = await api.post(`/techs/`,{
                id: newTech,
            });
    
            setTechs([...newTech, data]);
    
            setLoading(false);
    
            setNewTech(null);
    
            Keyboard.dismiss();
        }catch(error){
            alert(`${error}`)
            setLoading(false);
        }
        
    }

    async function handleDeleteTech(id){
        
        await api.delete(`/techs/${id}`);

        const filteredTechs = techs.filter((item) => item.id !== id);

        setTechs(filteredTechs);

        //setTechs([...newTech, data]);

    }

    function navigationToDetail(tech){
        navigation.navigate("TechDetails", {tech});
    }

    return (
        <Container>
            <Form>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Adicionar tecnologia"
                    value={newTech}
                    onChangeText={setNewTech}
                    returnKeyType="send"
                    onSubmitEditing={()=>{}}
                />

                <SubmitButton loading={loading} onPress={handleAddTech}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                        <MaterialIcons name="add" size={20} color="#FFF" />
                    )}
                </SubmitButton>
            </Form>

            <List 
                data={techs}
                keyExtractor={(tech) => tech.id}
                renderItem={({item}) =>(
                    <Tech>
                        <Name>{item.id}</Name>

                        <ProfileButton
                            background="#ffc107"
                            onPress={()=>navigationToDetail(item)}
                        >
                            <MaterialIcons name="design-services" size={20} color="#FFF" />
                        </ProfileButton>

                        <ProfileButton
                            background="#e0a800"
                            onPress={()=>handleDeleteTech(item.id)}
                        >
                            <MaterialIcons name="delete" size={20} color="#FFF" />
                        </ProfileButton>
                    </Tech>
                )}
            />
        </Container>
    );
}
