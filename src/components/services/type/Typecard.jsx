import { Button } from "@chakra-ui/react";
import React from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa"; // Import only the necessary icon

export default function TypeCard({ type, onOpen, onEdit }) {
  return (
    <div
      className="relative flex h-40 w-48 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <h3 className="mb-3 text-lg font-semibold italic text-gray-800">
        {type.type}
      </h3>
      <div className="absolute bottom-2 flex justify-center space-x-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          iconSpacing={0}
          colorScheme="blue"
          size="sm"
          variant="solid"
          className="transition-transform duration-300 hover:scale-105"
          leftIcon={<FaExternalLinkAlt />}
        />
   
          <Button
          onClick={(e) => {
              e.stopPropagation();
            onEdit();
          }}
          iconSpacing={0}
          colorScheme="yellow"
          size="sm"
          variant="solid"
          className="transition-transform duration-300 hover:scale-105"
          leftIcon={<FaEdit />}
        />
      </div>
    </div>
  );
}
