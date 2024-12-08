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
  NumberInput,
  NumberInputField,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "services/api";

const CreateOptionsForm = ({ isOpen, Option, onClose, fetchData, CITY }) => {
  console.log("option ", Option);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [longDescription, setLongDescription] = useState("");

  useEffect(() => {
    if (Option) {
      setName(Option.name || "");
      setImageUrl(Option.Image || "");
      setPrice(Option.price || 0);
      setShortDescription(Option.shortdescription || "");
      setDiscount(Option.discount || 0);
      setLongDescription(Option.Longdescription || "");
    }
  }, [Option]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const optionData = {
      name: name !== Option.name ? name : undefined,
      Image: imageUrl !== Option.Image ? imageUrl : undefined,
      price: price !== Option.price ? parseFloat(price) : undefined,
      shortdescription:
        shortDescription !== Option.shortdescription
          ? shortDescription
          : undefined,
      discount: discount !== Option.discount ? parseFloat(discount) : undefined,
      Longdescription:
        longDescription !== Option.Longdescription
          ? longDescription
          : undefined,
      optionId: Option._id,
      city: CITY,
    };

    try {
      // Filter out undefined fields
      const updatedFields = Object.fromEntries(
        Object.entries(optionData).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(updatedFields).length > 0) {
        const response = await postApi(
          "api/service/edit-option",
          updatedFields
        );
        if (response?.response?.status !== 500) {
          toast.success("Option Updated successfully");
        } else {
          toast.error("Something went wrong! Try using different option name");
        }
      } else {
        toast.info("No changes detected");
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
        <ModalHeader>Edit Option</ModalHeader>
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
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
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
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Short Description</FormLabel>
                <Textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter short description"
                  maxLength={150}
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
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Long Description</FormLabel>
                <Textarea
                  value={longDescription}
                  rows={15}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Enter long description"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update Option
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateOptionsForm;
