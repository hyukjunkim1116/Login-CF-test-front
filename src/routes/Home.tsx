import {
    Avatar,
    Box,
    Button,
    Text,
    useDisclosure,
    useToast,
    ToastId,
  } from "@chakra-ui/react";
import SignUpModal from "../components/SignUpModal";
import { useQuery ,useMutation, useQueryClient} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { logOut,getPhotos, getMe } from "../api";
import {IUser,IRoomPhotoPhoto}from "../types.d"
import ImageBox from "../components/ImageBox";
import useUser from "../lib/useUser";
import { useRef } from "react";
import {useCookies} from "react-cookie"
import Cookies from "js-cookie";

export default function Home() {
  const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isSignUpOpen,
        onOpen: onSignUpOpen,
        onClose: onSignUpClose,
      } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();
    const toastId = useRef<ToastId>();
    const { isLoading:photoLoading, data:photoData } = useQuery<IRoomPhotoPhoto[]>([`photo`], getPhotos);
    const mutation = useMutation(logOut, {
        onMutate: () => {
          toastId.current=toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            duration: 10000,
            position: "bottom-right",
          });
        },
        onSuccess: () => {
          if (toastId.current) {
            queryClient.refetchQueries(["me"]);
            toast.update(toastId.current, {
              status: "success",
              title: "Done!",
              description: "See you later!",
            });
          }
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
          {isLoggedIn ? (
            <>
            
              <Box>
              <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              <Text>{user?.avatar}</Text>
              <Text>{user?.email}</Text>
              <Text>{user?.name}</Text>
            </Box>
            <Box>
              
                <Button onClick={onLogOut}>Log out</Button>
                <Button><Link to="/photo">Upload Photo</Link></Button>
            </Box>
            <Box>
            {photoData?.map((photo)=>(
                <ImageBox
                pk={photo.pk}
                key={photo.pk}
                description={photo.description}
                file={photo.file}
                />
            ))};
            </Box>
            </>):<></>}
        </Box>
            )
        };
    
