import React from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

export default function CountryCard({  Country, onOpenClick, onEditClick }) {
  return (
    <div className="relative flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <h3 className="text-xl font-medium italic text-gray-800">
        {Country.name}
      </h3>
      <p className="absolute bottom-3 left-0 right-0 text-center text-blue-600">({Country?.currency?.slug})</p>
      <div className="absolute top-2 right-2 flex space-x-2">
        <IconButton
          aria-label="Open"
          icon={<FaExternalLinkAlt />}
          size="sm"
          onClick={onOpenClick}
          colorScheme="blue"
          variant="outline"
          className="text-blue-600 hover:bg-blue-100"
        />
        {/* <IconButton
          aria-label="Edit"
          icon={<FaEdit />}
          size="sm"
          onClick={onEditClick}
          colorScheme="yellow"
          variant="outline"
          className="text-yellow-600 hover:bg-yellow-100"
        /> */}
      </div>
    </div>
  );
}
