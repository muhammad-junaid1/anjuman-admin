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

const CreateServiceForm = ({ isOpen, categoryId, onClose, fetchData, CityID, CITY, COUNTRY }) => {
  const [serviceName, setServiceName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const validateServiceName = (name) => {
    const regex = /^[A-Za-z\s!@#$%^&*(),.?":{}|<>']+$/;
    return regex.test(name);
  };

  const validateImageUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateServiceName(serviceName)) {
      newErrors.serviceName =
        "Service name should contain only letters or special characters.";
    }

    if (!validateImageUrl(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const serviceData = {
        service: serviceName,
        image: imageUrl,
        categoryId: categoryId,
        city: CITY, 
        cityId: CityID, 
        country: COUNTRY
      };

      const response = await postApi(
        "api/service/create-service/" + categoryId,
        serviceData
      );
      if (response?.response?.status !== 500) {
        toast.success("Service created successfully");
      } else {
        toast.error("Something went wrong! Try using different service name");
      }
      fetchData();
      setServiceName(""); 
      setImageUrl(""); 
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
        <ModalHeader>Create New Service</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.serviceName}>
                <FormLabel>Service Name</FormLabel>
                <Input
                  value={serviceName}
                  onChange={(e) => {
                    setServiceName(e.target.value);
                    if (errors.serviceName) setErrors({});
                  }}
                  placeholder="Enter service name"
                  required
                />
                {errors.serviceName && (
                  <p className="text-red-500">{errors.serviceName}</p>
                )}
              </FormControl>

              <FormControl isInvalid={errors.imageUrl}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (errors.imageUrl) setErrors({});
                  }}
                  placeholder="Enter image URL"
                  required
                />
                {errors.imageUrl && (
                  <p className="text-red-500">{errors.imageUrl}</p>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create Service
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateServiceForm;
