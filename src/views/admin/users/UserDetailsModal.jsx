import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { Box, Image, Text, Stack, Flex, Badge, Button } from '@chakra-ui/react';


const UserDetailsModal = ({ data, isOpen, onClose }) => {
  const user = data; 
  return (
    <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        <Box
      maxW="lg"
      px={8}
      overflow="hidden"
      bg="white"
    >
      {/* Profile Header with Cover Image */}
      {user.coverImage && (
        <Image
          src={user.coverImage}
          alt="Cover Image"
          borderRadius="lg"
          boxSize="full"
          objectFit="cover"
        />
      )}
      
      {/* Profile Info */}
      <Flex mt={4} alignItems="center">
        <Image
          borderRadius="full"
          objectFit={"cover"}
          boxSize="100px"
          src={user.profilePicture}
          alt={user.username}
          mr={4}
        />
        <Stack spacing={1}>
          <Text fontSize="xl" fontWeight="bold">{user.fullName}</Text>
          <Text color="gray.500" fontSize="md">@{user.username}</Text>
          <Text color="gray.500" fontSize="sm">{user.email}</Text>
        </Stack>
      </Flex>

      {/* Bio Section */}
      <Box mt={4}>
        <Text fontSize="md" color="gray.700">
          {user.bio || 'No bio available'}
        </Text>
      </Box>

      {/* Followers and Following */}
      <Flex mt={4} justify="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500">Followers</Text>
          <Text fontSize="md" fontWeight="bold">{user.followers.length}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">Following</Text>
          <Text fontSize="md" fontWeight="bold">{user.following.length}</Text>
        </Box>
      </Flex>

      {/* Like Stats */}
      <Box mt={4}>
        <Text fontSize="sm" color="gray.500">Liked Posts</Text>
        <Text fontSize="md" fontWeight="bold">{user.likedPosts.length}</Text>
      </Box>

      {/* Action Buttons */}
      <Flex mt={6} justify="space-between" align="center">
        {user.isAdmin && (
          <Badge colorScheme="red" variant="outline">
            Admin
          </Badge>
        )}
      </Flex>
    </Box>
        
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
