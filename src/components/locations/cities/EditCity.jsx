import React, { useState, useEffect } from "react";
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

const EditCity = ({ isOpen, City, onClose, fetchData }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (City) {
      setName(City.name || "");
    }
  }, [City]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cityData = {
      name,
    };

    try {
      const response = await postApi(
        "api/locations/cities/" + City?._id,
        cityData
      );
      if (response?.response?.status !== 500) {
        toast.success("City Updated successfully");
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
        <ModalHeader>Edit City</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>City Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update City
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditCity;
