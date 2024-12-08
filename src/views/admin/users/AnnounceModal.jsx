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

const AnnounceModal = ({ data, isOpen, onClose }) => {
  const [announcement, setAnnouncement] = useState("");

  const handleSend = async () => {
    try {
      const response = await postApi("api/announcements/create", {
        text: announcement,
        to: data,
      });
      toast.success("Announced!");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Announcement</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Write your announcement"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <Button colorScheme="blue" mt={4} onClick={handleSend}>
            Done
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AnnounceModal;
