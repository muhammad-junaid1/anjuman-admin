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

const CreateServiceForm = ({ isOpen, service, onClose, fetchData, CITY }) => {
  const [serviceName, setServiceName] = useState(service?.service || "");
  const [imageUrl, setImageUrl] = useState(service?.image || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form values when service changes
    if (service) {
      setServiceName(service.service);
      setImageUrl(service.image);
    }
  }, [service]);

  const validateServiceName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const validateImageUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Only validate the fields that have been changed
    if (serviceName !== service.service && !validateServiceName(serviceName)) {
      newErrors.serviceName = "Service name should contain only letters.";
    }

    if (imageUrl !== service.image && !validateImageUrl(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Prepare service data with only changed fields
      const serviceData = {
        city: CITY
      };
      if (serviceName !== service.service) {
        serviceData.service = serviceName;
      }
      if (imageUrl !== service.image) {
        serviceData.image = imageUrl;
      }

      serviceData.categoryId = service.categoryId;
      serviceData.serviceId = service._id;

      if (Object.keys(serviceData).length === 0) {
        toast.info("No changes detected.");
        return;
      }

      const response = await postApi("api/service/edit-service/", serviceData);
      if (response?.response?.status !== 500) {
        toast.success("Service Updated successfully");
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
        <ModalHeader>Update Service</ModalHeader>
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
                />
                {errors.imageUrl && (
                  <p className="text-red-500">{errors.imageUrl}</p>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update Service
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateServiceForm;
