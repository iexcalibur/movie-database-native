import { View,Button, Column, Row, FormControl, Input, Select, FlatList, Pressable, Box, Avatar,Text, useTheme, useDisclose, AlertDialog, Spinner, Heading } from 'native-base'
import React, { useRef, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import useApi, { Result, SearchType} from '../hooks/useApi'
import { Keyboard } from 'react-native'

interface RouterProps {
    navigation: NavigationProp<any,any>
}


const List = ({navigation}: RouterProps) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [type, setType] = useState<SearchType>(SearchType.all)
    const [results, setResults] = useState<Result[]>([])

    const {searchData} = useApi();
    const theme = useTheme()
    const {isOpen,onOpen,onClose} = useDisclose();
    const [error,setError] = useState<string>()
    const cancelRef = useRef(null)
    const [loading,setLoading] = useState(false);

    const startSearch = async () => {
        Keyboard.dismiss();
        console.log('START')
        setResults([]);
        setLoading(true)
        const result = await searchData(searchTerm,type);
        if  (result.Search) {
            console.log('TEST',searchData)
            setResults(result.Search)
        } else {
            setError(result.Error || 'Error')
            onOpen()
        }
        setLoading(false)
    }

  return (
    <View flex={1}>
        <Column space={2} mt={4}>
            <Row mx={4} space={2}>
                <FormControl flex={1}>
                    <Input
                        fontSize={16}
                        placeholder='Search...'
                        value={searchTerm}
                        style={{backgroundColor:'#fff'}}
                        p={4}
                        onChangeText={(text) => setSearchTerm(text)}
                        
                    ></Input>
                </FormControl>
                <Select 
                    py={4} 
                    flex={1}
                    fontSize={16}
                    bg={'#fff'}
                    selectedValue={type}
                    onValueChange={(itemValue: any) => setType(itemValue)}
                    placeholder='Select Category'
                    accessibilityLabel='Select Category'
                    _selectedItem={{
                        endIcon: <Ionicons name='checkmark' size={18} />
                    }}

                >
                    <Select.Item label='All' value={SearchType.all}/>
                    <Select.Item label='Movie' value={SearchType.movie}/>
                    <Select.Item label='Series' value={SearchType.series}/>
                    <Select.Item label='Episode' value={SearchType.episode}/>
                </Select>
                <Button 
                    onPress={startSearch}
                    isDisabled={searchTerm === ''}
                    startIcon={<Ionicons name="search-outline" size={16} color={'#fff'}/>}
                >
                </Button>
            </Row>
        </Column>

        {loading && <Spinner mt={'auto'} size='lg' accessibilityLabel='Loading...'/>}

        <FlatList
            ListEmptyComponent={!loading ? <Heading>Start your search!</Heading>: <></>}
            mt={4}
            px={6}
            data={results}
            pb={24}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => navigation.navigate('MovieDetails',{id: item.imdbID})}
                >
                    <Box
                        borderBottomWidth={1}
                        py={2}
                        borderColor={theme.colors.coolGray[300]}
                    >
                        <Row space={2} alignItems="center">
                            <Avatar 
                                size={'50px'} 
                                source={{ uri: item.Poster }} />
                            
                            <Column flex={1}>
                                <Text
                                    bold
                                    color={theme.colors.darkText}
                                >
                                    {item.Title}
                                </Text>
                                <Text 
                                    color={theme.colors.light[500]}
                                >
                                    {item.Year}
                                </Text>
                            </Column>
                            <Ionicons 
                                name="chevron-forward" 
                                color={theme.colors.light[500]}
                            ></Ionicons>
                        </Row>
                        
                    </Box>

                </Pressable>
            )}
        ></FlatList>

        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Ooops</AlertDialog.Header>
                <AlertDialog.Body>This just hapepned: {error}</AlertDialog.Body>
                
            </AlertDialog.Content>
        </AlertDialog>
       
    </View>
  )
}

export default List

