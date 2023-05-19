import {
    Avatar,
    Box,
    Button,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
import SignUpModal from "../components/SignUpModal";
import { useQuery ,useMutation} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMe,logOut,getPhotos } from "../api";
import {IUser,IRoomPhotoPhoto}from "../types.d"
import ImageBox from "../components/ImageBox";

export default function Home() {
    const {
        isOpen: isSignUpOpen,
        onOpen: onSignUpOpen,
        onClose: onSignUpClose,
      } = useDisclosure();
      const toast = useToast();
    const { isLoading, data } = useQuery<IUser>([`me`], getMe);
    const { isLoading:photoLoading, data:photoData } = useQuery<IRoomPhotoPhoto[]>([`photo`], getPhotos);
    console.log(photoData)
    const mutation = useMutation(logOut, {
        onMutate: () => {
          toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            duration: 10000,
            position: "bottom-right",
          });
        },
      });
    const onLogOut = async () => {
        mutation.mutate();
      };
    return (
        <Box>
            <Button onClick={onSignUpOpen} colorScheme={"red"}>
            Sign up
            </Button>
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
            <Box>
              <Box>
                <Avatar name={data?.name} src={data?.avatar} size={"md"} />
                <div>{data?.avatar}</div>
                <div>{data?.email}</div>
                <div>{data?.name}</div>
                <div>{data?.email}</div>
              </Box>
                <Button onClick={onLogOut}>Log out</Button>
                <Button><Link to="/photo">Upload Photo</Link></Button>
            </Box>
            <Box>
            {photoData?.map((photo)=>(
                <ImageBox
                pk={photo.pk}
                description={photo.description}
                file={photo.file}
                />
            ))};
            </Box>
        </Box>
            )
        };
    
