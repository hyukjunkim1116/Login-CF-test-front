import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";


export default function Root() {
  return (
    <Box>
      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
}