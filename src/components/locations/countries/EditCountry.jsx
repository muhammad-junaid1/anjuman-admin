import React, { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "services/api";
import { getApi } from "services/api";

const EditCountryForm = ({ countryId, isOpen, onClose, fetchData }) => {
  const [countryName, setCountryName] = useState("");
  const [currenciesData, setCurrenciesData] = useState([]);
  const [currencyId, setCurrencyId] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const countryData = {
        name: countryName,
        currency: currencyId,
      };

      const response = await postApi(
        "api/locations/countries/" + countryId,
        countryData
      );
      if (response?.response?.status !== 500) {
        toast.success("Country Updated successfully");
      } else {
        toast.error("Something went wrong! Try using different country name");
      }
      setCountryName(""); 
      setCurrencyId(""); 
      fetchData();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const fetchCurrencies = async () => {
    try {
      const response = await getApi("api/currency");
      setCurrenciesData(response.data?.currencies || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCurrencies();
    }
  }, [isOpen]);
  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Country</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.categoryName}>
                <FormLabel>Country Name</FormLabel>
                <Input
                  value={countryName}
                  onChange={(e) => {
                    setCountryName(e.target.value);
                    if (errors.categoryName) setErrors({});
                  }}
                  placeholder="Enter country name"
                  required
                />
                {errors.categoryName && (
                  <p className="text-red-500">{errors.categoryName}</p>
                )}
              </FormControl>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Select Currency</FormLabel>
                <Select
                  onChange={(e) => setCurrencyId(e.target.value)}
                  value={currencyId}
                  disabled={!currenciesData.length}
                >
                  <option value={""} disabled selected>
                    Select any
                  </option>
                  {currenciesData?.map((currency) => {
                    return (
                      <option value={currency?._id} key={currency?._id}>
                        {currency.name}
                      </option>
                    );
                  })}
                </Select>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update Country
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditCountryForm;
