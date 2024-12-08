import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { postApi } from "services/api";

const SendMessageModal = ({ data, isOpen, onClose }) => {
  const [announcement, setAnnouncement] = useState("");

  const handleSend = async () => {
    try {
      const response = await postApi("api/admin/send-email", {
        subject: "Hi from Anjuman!",
        body: announcement,
        to: data?.email,
      });
      toast.success("Message sent!");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Write your message"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <Button colorScheme="blue" mt={4} onClick={handleSend}>
            Send
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SendMessageModal;
