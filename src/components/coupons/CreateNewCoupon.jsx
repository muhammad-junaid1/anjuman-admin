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
  NumberInput,
  NumberInputField,
  Select,
  CheckboxGroup,
  Checkbox,
  VStack,
  CircularProgress,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "services/api";
import { getApi } from "services/api";

  function formatDate(date) {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

const CreateCouponForm = ({ isOpen, onClose, fetchData, CITY, CityID, COUNTRY }) => {
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("1");
  const [customUsageLimit, setCustomUsageLimit] = useState(1);
  const [selectedServices, setSelectedServices] = useState([""]);
  const [services, setServices] = useState([]); 
  const [servicesLoading, setServicesLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const couponData = {
        code : code?.toUpperCase() || "",
        discount: parseInt(discount),
        expiryDate: formatDate(new Date(expiryDate)),
        city: CITY, 
        country: COUNTRY,
        cityId: CityID, 
        usageLimit: parseInt(
          usageLimit === "custom" ? customUsageLimit : usageLimit
        ),
        applicableServices: selectedServices,
        image
      };

      await postApi("api/coupons", couponData); 
      toast.success("Coupon created successfuly"); 
      fetchData(CITY); 
      onClose(); 

      setCode(""); 
      setImage(""); 
      setExpiryDate(""); 
      setUsageLimit(""); 
      setDiscount(0); 
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchServices = async (CITY) => {
    try {
      setServicesLoading(true); 
      const services = await getApi(`api/service/get-services?city=${CITY}`);
      setServices(services?.data?.services || []); 
      setServicesLoading(false); 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong"); 
    }
  }

  useEffect(() => {
    fetchServices(CITY); 
  }, [CITY]); 


  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Coupon</ModalHeader>
        <ModalCloseButton />
        <form action="#" onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <Input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image url"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Discount (%)</FormLabel>
                <NumberInput
                  min={0}
                  max={100}
                  value={discount}
                  onChange={(value) => setDiscount(value)}
                >
                  <NumberInputField required />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={expiryDate}
                  required
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Usage Limit</FormLabel>
                <Select
                  required
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                >
                  <option value="1">One-time</option>
                  <option value="-1">Infinite</option>
                  <option value="custom">Custom</option>
                </Select>
                {usageLimit === "custom" && (
                  <NumberInput
                    min={1}
                    value={customUsageLimit}
                    onChange={(value) => setCustomUsageLimit(value)}
                  >
                    <NumberInputField placeholder="Enter number of times" />
                  </NumberInput>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Applicable Services</FormLabel>
                {servicesLoading ? <CircularProgress isIndeterminate/> : 
                <div className="h-[130px] overflow-y-scroll">
                  <RadioGroup
                    value={selectedServices[0]}
                    onChange={(value) => setSelectedServices([value])}
                  >
                    {services.map((service) => (
                      <Radio
                        className="mx-2"
                        key={service.slug}
                        value={service.slug}
                      >
                        {service?.service}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
                }
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create Coupon
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateCouponForm;
