import { FaComment, FaGithub, FaGoogle, FaNapster } from "react-icons/fa";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
  

  let kakaoParams = {
    client_id: "5c41d07be161c81979b0eb05ec72f14b",
    redirect_uri: "https://drinkdrinkdrink.xyz/social/kakao",
    response_type: "code",
  };
  const githubParams = {
    client_id: "e8d3c4d44f3084e58e7f",
    scope: "read:user,user:email",
  };
  const googleParams = {
    scope:"profile email",
    redirect_uri:"https://drinkdrinkdrink.xyz/social/google",
    response_type:"code",
    client_id:"660367536403-rus6dd2kgkqkra03dq1otkutpi6uke22.apps.googleusercontent.com",
  }
  const naverParams = {
    client_id: "qsnqfsgk2tkIJ1jPGYUP",
    response_type: "code",
    redirect_uri: "http://127.0.0.1:3000/social/naver",
    state:"1",
  }

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
    kakaoParams
  ).toString()}`;
  const githubUrl = `https://github.com/login/oauth/authorize?${new URLSearchParams(
    githubParams
  ).toString()}`;
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    googleParams
  ).toString()}`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?${new URLSearchParams(
    naverParams
  ).toString()}`;
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button as="a" href={githubUrl} w="100%" leftIcon={<FaGithub />}>
          Continue with Github
        </Button>
        <Button
          as="a"
          href={kakaoUrl}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
        <Button as="a" href={googleUrl} w="100%" leftIcon={<FaGoogle />}>
          Continue with Google
        </Button>
        <Button as="a" href={naverUrl} w="100%" leftIcon={<FaNapster />}>
          Continue with Naver
        </Button>
      </VStack>
    </Box>
  );
}
