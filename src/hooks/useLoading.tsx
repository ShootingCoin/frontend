import { useState } from "react";
import ReactDOM from 'react-dom';
import { Box } from "@chakra-ui/react";
import { Spinner } from "src/components/common";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingDialog = () => isLoading ? ReactDOM.createPortal(
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      background="#00000066"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Spinner size={50} />
      </Box>
    </Box>
  , document.querySelector("#modal-portal")) : <></>;

  return {
    isLoading,
    setIsLoading,
    LoadingDialog,
  }
};
