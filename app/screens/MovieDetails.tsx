import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListStackParamList } from '../nav/Tabs';
import useApi, { DetailsResult } from '../hooks/useApi';
import { Box, Heading, IconButton, Image, ScrollView, Skeleton, VStack } from 'native-base';
import * as MailComposer from 'expo-mail-composer';
import {Ionicons} from '@expo/vector-icons'



type Props = NativeStackScreenProps<ListStackParamList, 'MovieDetails'>;

const MovieDetails = ({ route, navigation }: Props) => {
	const { getDetails } = useApi();
	const [information, setInformation] = useState<DetailsResult | null>(null);

	useEffect(() => {
		const load = async () => {
			const data = await getDetails(route.params.id);
			navigation.setOptions({
				title: data.Title,
                headerRight:() => <IconButton 
                                    onPress={share}
                                    icon={<Ionicons name='share-outline' size={22} /> }
                                  ></IconButton>, 
			});
			setInformation(data);
		};
		load();
	}, []);

    const share = async () => {
        MailComposer.composeAsync({
            recipients: ['imarsenal80@gmail.com'],
            subject:`My Favorite Movie is : ${information?.Title}`,
            body: information?.Plot,
        })
    }

    

	return (
		<ScrollView p={4}>
			{information && (
				<Box 
                    mb={8} 
                    borderRadius="md" 
                    borderWidth={0} 
                    shadow={2} 
                    background={'#fff'}>
					<VStack space={4}>
						<Box p={4}>
							<Heading>
                                {information.Title}
                            </Heading>
							<Text>
                                {information.Year}
                            </Text>
						</Box>
						<Box>
							<Image
								margin={'auto'}
								size={'2xl'}
								source={{
									uri: information?.Poster
								}}
								alt="Post"
							/>
						</Box>

						<Box 
                            px="2" 
                            pt={2}
                            pb={4}>
							<Text>{information?.Plot}</Text>
						</Box>
					</VStack>
				</Box>
			)}

            {
                !information && (
                    <Box borderRadius="md" borderWidth={0} shadow={4} background={'#fff'}>
                        <VStack space="4">
                            <Box px="4" pt="4">
                                <Skeleton.Text />
                            </Box>
                            <Skeleton margin={'auto'} size={'sm'} p="4" startColor={'coolGray.200'} />
                            <Box px="4" pb={4}>
                                <Skeleton.Text />
                                <Skeleton.Text pt={2} />
                            </Box>
                        </VStack>
                    </Box>
                )
            }
		</ScrollView>
	);
};

export default MovieDetails;