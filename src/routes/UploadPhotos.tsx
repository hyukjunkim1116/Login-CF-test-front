import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    useToast,
    VStack,
  } from "@chakra-ui/react";
  import { useMutation } from "@tanstack/react-query";
  import { useForm } from "react-hook-form";
  import { createPhoto,getUploadURL ,uploadImage} from "../api";
import { Link } from "react-router-dom";

  interface IForm {
    file: FileList;
  }
  interface IUploadURLResponse {
    id: string;
    uploadURL: string;
  }
  
  
  export default function UploadPhotos() {
    const { register, handleSubmit, watch,reset } = useForm<IForm>();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
              createPhotoMutation.mutate({
                description: "I love react",
                file: `https://imagedelivery.net/HJp5QxdhWUPJCBwwKFtO-A/${result.id}/public`,
              });
        }
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
          uploadImageMutation.mutate({
            uploadURL: data.uploadURL,
            file: watch("file"),
          });
        },
      });
    const onSubmit = () => {
        uploadURLMutation.mutate();
    };


    return (
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload a Photo</Heading>
            
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={10}
            >
              <FormControl>
                <Input {...register("file")} type="file" accept="image/*" />
              </FormControl>
               <Button
              isLoading={
                createPhotoMutation.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              type="submit"
              w="full"
              colorScheme={"red"}
            >
                Upload photos
              </Button>
              <Button>
                <Link to="/">Go Home</Link>
              </Button>
            </VStack>
          </Container>
          
        </Box>
    );
  }