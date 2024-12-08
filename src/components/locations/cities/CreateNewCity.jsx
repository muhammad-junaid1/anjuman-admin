import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "services/api";

const CreateNewCity = ({ isOpen, countryId, onClose, fetchData }) => {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cityData = {
        name,
        country: countryId,
      };

      const response = await postApi("api/locations/cities/", cityData);

      if (response?.response?.status !== 500) {
        toast.success("City created successfully");
      } else {
        toast.error("Something went wrong! Try using different city name");
      }

      fetchData();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create City</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>City Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter city name"
                  required
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create City
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewCity;
