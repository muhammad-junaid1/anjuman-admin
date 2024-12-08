import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { postApi } from "services/api";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Card = (props) => {
  const [isOn, setIsOn] = useState(props.Service.enabled);

  const handleToggle = async (e) => {
    e.stopPropagation(); // Prevent event from propagating to parent
    const newState = !isOn;
    setIsOn(newState);

    try {
      await postApi("api/service/enable-service/" + props.Service._id, {});
      if (props.onToggle) {
        props.onToggle(); // Optionally refresh parent data or perform other actions
      }
    } catch (error) {
      console.error("Error toggling service:", error);
      setIsOn(!newState);
    }
  };

  const handleOpenClick = (e) => {
    e.stopPropagation();
    if (props.Service.enabled && props.onOpen) {
      props.onOpen();
    } else {
      toast.warn("This service is not enabled for selection.");
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (props.onEdit) {
      props.onEdit();
    }
  };

  return (
    <div className="group relative grid  h-72 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={props.Service.image}
        className={`h-32 w-40 rounded-lg object-cover ${
          !isOn ? "opacity-50" : ""
        }`}
        alt={props.Service.service}
      />
      <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
        {props.Service.service}
      </h3>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <span
          className={`text-sm ${isOn ? "text-green-500" : "text-gray-500"}`}
        >
          {isOn ? "On" : "Off"}
        </span>
        <button
          onClick={handleToggle}
          className={`relative h-6 w-12 rounded-full focus:outline-none ${
            isOn ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
              isOn ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2 ">
        <Button
          onClick={handleOpenClick}
          iconSpacing={0}
          colorScheme="blue"
          size="sm"
          variant="solid"
          className="transition-transform duration-300 hover:scale-105"
          leftIcon={<FaExternalLinkAlt />}
        />
        <Button
          onClick={handleEditClick}
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
};

export default Card;
