import React, { useState } from "react";
import { Box, Image, Text, Heading, Badge } from "@chakra-ui/react";

const EventCard = ({ event }) => {
    const [showAttendees, setShowAttendees] = useState(false); 
  return (

    <Box shadow="lg" borderWidth={1} borderRadius="lg" overflow="hidden">
      {/* Event Cover Image */}
      <Image
        src={event.coverImage}
        alt={event.title}
        boxSize="100%"
        objectFit="cover"
      />

      {/* Event Details */}
      <Box p={4}>
        <Heading size="md">{event.title}</Heading>
        <Text fontSize="sm" color="gray.500" my={2}>
          {new Date(event.eventDate).toLocaleString()}
        </Text>
        <Text noOfLines={3} fontSize="md">
          {event.description}
        </Text>
        <Text fontSize="sm" fontWeight="bold" mt={3}>
          Location: {event.location}
        </Text>

        {event?.attendees?.length !== 0 && (
          <div className="mt-3 text-blue-500">
          {showAttendees ?   <p onClick={() => setShowAttendees(false)} className="w-max cursor-pointer">
              Hide {event?.attendees?.length} attendees
            </p> : 
            <p onClick={() => setShowAttendees(true)} className="w-max cursor-pointer">
              Show {event?.attendees?.length} attendees
            </p>
          }
            <div className="flex flex-col mt-2">
                {showAttendees && event?.attendees?.map((att) => {
                  return (
                    <Badge
                      style={{
                        textTransform: "lowercase",
                      }}
                      colorScheme="gray"
                      key={att.id}
                    >
                      @{att.username}
                    </Badge>
                  );
                })}
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default EventCard;
