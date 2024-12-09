import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Heading, Text, Button, useToast, Spinner, GridItem } from '@chakra-ui/react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { getApi } from 'services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  // Fetch events when the component mounts
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getApi('api/events');
      setEvents(response.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEventClick = () => {
    setIsModalOpen(true);  // Open modal for creating new event
  };

  return (
    <Box mt={4} className='relative'>

      {/* Button to create a new event */}
      <Button colorScheme="blue" mb={4} onClick={handleCreateEventClick}>
        Create Event
      </Button>

      {/* Loading state */}
      {loading ? (
        <Spinner className='absolute left-0 top-16' size="lg" />
      ) : (
        <SimpleGrid mt={5} columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {events.length === 0 && <p>No events found!</p>}
          {events.map(event => (
            <GridItem key={event._id}>
              <EventCard event={event} />
            </GridItem>
          ))}
        </SimpleGrid>
      )}

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={fetchEvents} />
    </Box>
  );
};

export default EventsPage;
