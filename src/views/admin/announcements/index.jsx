import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getApi } from "services/api";
import { postApi } from "services/api";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState("");
  const [loading, setLoading] = useState(true); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchAnnouncements = async () => {
    try {
        setLoading(true); 
      const announcements = await getApi("api/announcements");
      setAnnouncements(announcements.data || []);
        setLoading(false); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch announcements");
    }
  };

  // Fetch announcements when the page loads
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Function to create an announcement
  const handleCreateAnnouncement = async () => {
    try {
      const announcementData = {
        text: announcementText,
        to: null, // For everyone
      };
      const response = await postApi("api/announcements/create", announcementData);
      setAnnouncements([...announcements, response.data]);
      setAnnouncementText("");
      onClose();
    } catch (error) {
      console.log("Error creating announcement", error);
    }
  };

  return (
    <Box py={5}>
      <Text fontSize="lg" mb={5}>
        Go to{" "}
        <Link to={"/admin/users"} className="text-blue-500">
          Users Management
        </Link>{" "}
        to announce anything to a specific user.
      </Text>

      <Button colorScheme="blue" onClick={onOpen}>
        Create Announcement for Everyone
      </Button>

      <Stack spacing={4} mt={5}>
      {!loading && announcements.length === 0 && <p>No announcements found!</p>}
        {announcements.map((announcement) => (
          <Card key={announcement._id} boxShadow="md" borderRadius="md">
            <CardBody>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {announcement.to ? (
                  <>
                    Announcement to{" "}
                    <Text as="span" fontWeight="bold">
                      {announcement.to.username}
                    </Text>
                  </>
                ) : (
                  <Text as="span" fontWeight="bold">
                    To Everyone
                  </Text>
                )}
              </Text>
              <Text mb={2}>{announcement.text}</Text>
              <Text color="gray.500">
                Created on:{" "}
                {new Date(announcement.createdAt).toLocaleDateString()}
              </Text>

              {announcement.to && (
                <Box mt={2} display="flex" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={announcement.to.profilePicture}
                    alt={announcement.to.username}
                    mr={3}
                  />
                  <Text>{announcement.to.username}</Text>
                </Box>
              )}
            </CardBody>
          </Card>
        ))}
      </Stack>

      {/* Modal for creating an announcement */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter announcement text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateAnnouncement}
            >
              Create Announcement
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AnnouncementsPage;
