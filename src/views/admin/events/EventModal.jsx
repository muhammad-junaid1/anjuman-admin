import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { postApi } from "services/api";
import { toast } from "react-toastify";

const EventModal = ({ isOpen, onClose, onSubmit }) => {
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    coverImage: "",
    location: "",
    organizer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await postApi("api/events", {...formData, coverImage: img}); // Send the event data to the backend
      if(response.status === 400){
        toast.error(response.data?.message);
        return;
      }
      toast.success("Event created successfully");
      onSubmit(); // Refresh events list
      onClose(); // Close modal
    } catch (error) {
      console.log(error);
      toast.error("Failed to create event");
    }
  };

  const imgRef = useRef(null);
  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Event Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Event Date</FormLabel>
            <Input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Cover Image</FormLabel>
            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={(e) => handleImgChange(e)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Organizer</FormLabel>
            <Input
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create Event
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
