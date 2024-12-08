import React from "react";
import { Box, Text, Badge, VStack, HStack } from "@chakra-ui/react";
import allServices from "../../data/allservices.json";

const CouponCard = ({ coupon }) => {
  const { code, discount, expiryDate, usageLimit, applicableServices } = coupon;
  const isExpired = new Date(expiryDate) < new Date(); 
  return (
    <Box
      className={`mx-auto w-full overflow-hidden rounded-xl shadow-md`}
      borderWidth="1px"
      style={{
        background: isExpired ? "#dbdbdb75" : "white"
      }}
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="gray.50"
      mt={5}
    >
      {/* <Image className="w-full h-48 object-cover" src={bannerImage} alt={`Banner for ${code}`} /> */}

      <VStack alignItems={"flex-start"} className="px-2 py-4">
        <HStack justifyContent="space-between" w="full">
          <Text className="text-xl font-semibold" color="gray.800">
            {code}
          </Text>
          <Badge colorScheme="green" className="ml-2">
            {discount}% OFF
          </Badge>
        </HStack>

        <HStack justifyContent={"space-between"} w="full">
          {isExpired ?<Text className=" text-red-500">
            <span>Expired on</span>:{" "}
            {new Date(expiryDate).toLocaleDateString()}
          </Text> : <Text className=" text-gray-700">
            <span className="text-gray-800">Expires on</span>:{" "}
            {new Date(expiryDate).toLocaleDateString()}
          </Text>

          }
          {usageLimit !== null && (
            <Text className="text-gray-700">
              {usageLimit === 1
                ? "One-time"
                : usageLimit !== -1
                ? usageLimit + "times"
                : "Infinite"}
            </Text>
          )}
        </HStack>

        <HStack justifyContent={"flex-start"} className="mt-2">
          <p className=" text-left text-md italic text-gray-700">
            {applicableServices[0]}
          </p>{" "}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CouponCard;
