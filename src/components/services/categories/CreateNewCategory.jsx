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

const CreateCategoryForm = ({ isOpen, onClose, fetchData, COUNTRY, CityID, CITY }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const validateCategoryName = (name) => {
    const regex = /^[A-Za-z\s!@#$%^&*(),.?":{}|<>]+$/; // Regular expression for letters and spaces
    return regex.test(name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCategoryName(categoryName)) {
      setErrors({
        categoryName:
          "Category name should contain only letters or special characters",
      });
      return;
    }
    try {
      const categoryData = {
        category: categoryName,
        city: CITY, 
        cityId: CityID,
        country: COUNTRY
      };


      const response = await postApi(
        "api/service/create-category",
        categoryData
      );
      if (response?.response?.status !== 500) {
        toast.success("Category created successfully");
      } else {
        toast.error("Something went wrong! Try using different category name");
      }
      fetchData();
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
        <ModalHeader>Create New Category</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.categoryName}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    if (errors.categoryName) setErrors({});
                  }}
                  placeholder="Enter category name"
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
              Create Category
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryForm;
