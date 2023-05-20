import {
    Modal,
  } from "@chakra-ui/react";
  import SocialLogin from "./SocialLogin";
  
  interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
      <Modal onClose={onClose} isOpen={isOpen}>
            <SocialLogin />
      </Modal>
    );
  }