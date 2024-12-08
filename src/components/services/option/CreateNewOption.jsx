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
  NumberInput,
  NumberInputField,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "services/api";
import { getApi } from "services/api";

const CreateOptionsForm = ({ isOpen, typeId, onClose, fetchData, CityID, CITY, COUNTRY }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [longDescription, setLongDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await getApi("api/locations/countries/" + COUNTRY); 
    const currency = response.data?.country?.currency?.slug; 

    try {
      const optionData = {
        name,
        Image: imageUrl,
        typeId: typeId,
        price: parseFloat(price)?.toFixed(2),
        shortdescription: shortDescription,
        discount: parseFloat(discount),
        Longdescription: longDescription,
        city: CITY, 
        cityId: CityID,
        country: COUNTRY, 
        currency
      };

      const response = await postApi(
        "api/service/create-option/" + typeId,
        optionData
      );

      if (response?.response?.status !== 500) {
        toast.success("Option created successfully");
        setName(""); 
        setImageUrl(""); 
        setPrice(0); 
        setDiscount(""); 
        setShortDescription(""); 
        setLongDescription(""); 
      } else {
        toast.error("Something went wrong! Try using different option name");
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
        <ModalHeader>Create Option</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  min={0}
                  value={price}
                  onChange={(valueString) => setPrice(valueString)}
                  precision={2}
                >
                  <NumberInputField required />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Short Description</FormLabel>
                <Textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter short description"
                  maxLength={150}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Discount (%)</FormLabel>
                <NumberInput
                  min={0}
                  max={100}
                  value={discount}
                  onChange={(valueString) => setDiscount(valueString)}
                >
                  <NumberInputField required />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Long Description</FormLabel>
                <Textarea
                  rows={15}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Enter long description"
                  required
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create Option
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateOptionsForm;
