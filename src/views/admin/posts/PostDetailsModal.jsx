import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Avatar,
  VStack,
  HStack,
} from "@chakra-ui/react";

import { Box, Image, Text, Stack, Flex, Badge, Button } from '@chakra-ui/react';


const PostDetailsModal = ({ data, isOpen, onClose }) => {

    const { text, image, comments,  label, likes, createdAt } = data;
  const { username, profilePicture, fullName, email } = data.user;
  return (
    <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>

     <Box mb={4} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm" maxW="lg" margin="auto">
      {/* User info section */}
      <Flex mb={4}>
        <Avatar name={username} src={profilePicture} size="lg" />
        <VStack ml={4} align="start">
          <Text fontSize="lg" fontWeight="bold">{fullName}</Text>
          <Text fontSize="sm" color="gray.500">{username}</Text>
          <Text fontSize="sm" color="gray.400">{email}</Text>
        </VStack>
      </Flex>

      {/* Post content */}
      <Box mb={4}>
        <span className="rounded-full p-1 px-3 bg-[#000] text-white">{label}</span>
        <Text fontSize="md" color="gray.800" className="mt-3">{text}</Text>
        {image && <Image mt={2} src={image} alt="Post image" maxH="400px" objectFit="cover" />}
      </Box>

         <Text fontSize="xs" color="gray.400" mb={4}>
        Posted on {new Date(createdAt).toLocaleDateString()}
      </Text>

      {/* Likes and comments section */}
      <HStack spacing={4} mb={4}>
        <Badge colorScheme="gray">{comments.length} Comments</Badge>
        <Badge colorScheme="gray">{likes.length} Likes</Badge>
      </HStack>

      {/* Comments Section */}
      {comments.length > 0 && (
        <Box mt={4} pl={4} borderLeft="4px solid" borderColor="gray.200">
          {comments.map((comment) => {
            const { text, user: commentUser, _id } = comment;
            return (
              <Flex key={_id} mb={4}>
                <Avatar name={commentUser.username} src={commentUser.profilePicture} size="sm" />
                <VStack ml={4} align="start">
                  <Text fontSize="sm" fontWeight="bold">{commentUser.fullName} ● {'@' + commentUser.username}</Text>
                  <Text fontSize="sm" color="gray.600">{text}</Text>
                </VStack>
              </Flex>
            );
          })}
        </Box>
      )}

      {/* Footer with post timestamp */}
   
    </Box> 
        
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailsModal;
