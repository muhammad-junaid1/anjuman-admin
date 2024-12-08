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

const CreateTypeForm = ({ isOpen, serviceId, onClose, fetchData, CityID, CITY, COUNTRY}) => {
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const typeData = {
        type,
        city: CITY, 
        country: COUNTRY,
        serviceId: serviceId,
        cityId: CityID
      };

      const response = await postApi("api/service/create-type/" + serviceId, typeData);
      if(response?.response?.status !== 500) {
        toast.success("Type created successfully");
        setType(""); 
      } else {
        toast.error("Something went wrong! Try using different type name");
      }
      fetchData();
      onClose();
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Type</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter type"
                  required
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create Type
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTypeForm;
