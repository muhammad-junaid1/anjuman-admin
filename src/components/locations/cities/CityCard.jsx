import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import the Edit icon
import { toast } from "react-toastify";
import { postApi } from "services/api";

export default function CityCard({city, onEdit, fetchCities }) {

  const deleteCity = async function(id) {
    try {
      const response = await postApi("api/locations/cities/delete/" + id); 
      if(response.status === 200) {
        toast.success("City deleted successfully");
        fetchCities(); 
      }
    } catch (error) {
      console.error(error); 
      toast.error("Something went wrong");   
    }
  }

  return (
    <div className="group relative grid h-full w-72 items-center justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <p>{city?.name}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from bubbling up
          deleteCity(city?._id); 
        }}
        className="absolute top-2 p-2 right-2 rounded-full bg-red-600 text-white hover:bg-blue-700"
        aria-label="Delete"
      >
        <FaTrash size={15} />
      </button>
    </div>
  );
}
