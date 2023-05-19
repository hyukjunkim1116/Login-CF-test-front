import { Card,CardBody, Image, Stack, Text } from '@chakra-ui/react'
import {IRoomPhotoPhoto} from "../types.d"


export default function ImageBox({
    pk,
    description,
    file,
} :IRoomPhotoPhoto) {
    return (
        <Card w="100%"
        position="relative"
        overflow={"hidden"}
        mb={3}
        mt={10}
        rounded="2xl">
            <CardBody>
                <Image src={file} objectFit={"cover"} minH="280" borderRadius='lg'/>
                    <Stack mt='6' spacing='3'>
                            <Text>{description}</Text>
                            <Text color='blue.600' fontSize='2xl'>{pk}</Text>
                    </Stack>
            </CardBody>
      </Card>
    )
}