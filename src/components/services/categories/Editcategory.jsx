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

const CreateCategoryForm = ({ categoryId, isOpen, onClose, fetchData, CITY }) => {
  console.log("id", categoryId);
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const validateCategoryName = (name) => {
    const regex = /^[A-Za-z\s]+$/; // Regular expression for letters and spaces
    return regex.test(name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCategoryName(categoryName)) {
      setErrors({ categoryName: "Category name should contain only letters" });
      return;
    }
    try {
      const categoryData = {
        category: categoryName,
        categoryId: categoryId,
        city: CITY
      };

      const response = await postApi("api/service/edit-category", categoryData);
      if (response?.response?.status !== 200) {
        toast.success("Category Updated successfully");
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
        <ModalHeader>Edit Category</ModalHeader>
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
              update Category
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryForm;
