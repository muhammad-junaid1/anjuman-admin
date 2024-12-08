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

const EditCurrency = ({ currencyId, isOpen, onClose, fetchData }) => {
  const [currencyName, setCurrencyName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currencyData = {
        name: currencyName,
      };

      const response = await postApi(
        "api/currency/" + currencyId,
        currencyData
      );
      if (response?.response?.status !== 500) {
        toast.success("Currency Updated successfully");
      } else {
        toast.error("Something went wrong! Try using different currency name");
      }
      fetchData();
      setCurrencyName(""); 
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Currency</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.categoryName}>
                <FormLabel>Currency Name</FormLabel>
                <Input
                  value={currencyName}
                  onChange={(e) => {
                    setCurrencyName(e.target.value);
                    if (errors.categoryName) setErrors({});
                  }}
                  placeholder="Enter currency name"
                  required
                />
                {errors.categoryName && (
                  <p className="text-red-500">{errors.categoryName}</p>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update Currency
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditCurrency;
