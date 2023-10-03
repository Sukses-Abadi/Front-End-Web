import fetchWithToken from "@/lib/fetchWithToken";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function UpdateAddress(props) {
  const router = useRouter();

  const { address, cities } = props;
  const [name, setName] = useState(address.name);
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city.id);
  const [zipCode, setZipCode] = useState(address.zip_code);

  let payload = {
    id: address.id,
    name: name,
    street: street,
    city_id: city,
    zip_code: zipCode,
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchWithToken(
        "api/address",
        getCookie(`accessToken`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        }
      );

      if (response.data) {
        console.log("Address updated successfully");
        toast.success("Address updated");

        router.refresh();
      } else {
        console.error("Error updating address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  let payload2 = {
    id: address.id,
  };

  const handleDelete = async (addressID) => {
    try {
      const response = await fetchWithToken(
        "api/address",
        getCookie("accessToken"),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload2),
          cache: "no-store",
        }
      );

      if (response.data) {
        console.log("Address deleted successfully");
        toast.success("Address deleted");

        router.refresh();
      } else {
        console.error("Error delete address");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col mt-4 p-4 w-full border rounded-md shadow-md">
      <div className="flex">
        <h1 className="text-lg font-semibold text-primary pb-3">{name}</h1>
      </div>
      <div className="flex">
        <p className="text-md font-light text-primary">Street : {street}</p>
      </div>
      <div className="flex">
        <p className="text-md font-light text-primary">City : {city}</p>
      </div>
      <div className="flex">
        <p className="text-md font-light text-primary">Zip Code : {zipCode}</p>
      </div>

      <div className="flex flex-row-reverse gap-y-2">
        <button
          className="text-sm font-normal text-red-600 px-3 py-4  hover:text-red-800"
          onClick={() => handleDelete(address.id)}
        >
          Delete Address
        </button>

        <button
          className="text-sm font-normal text-red-600 px-3 py-4  hover:text-red-800"
          onClick={() =>
            document.getElementById(`my_modal_${address.id}`).showModal()
          }
        >
          Edit Address
        </button>

        <dialog id={`my_modal_${address.id}`} className="modal">
          <div className="modal-box rounded-lg">
            <form method="dialog">
              <div className="flex flex-row pb-8">
                <h1 className="font-medium text-lg text-primary opacity-80">
                  Edit Your Address
                </h1>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-2">
                  ✕
                </button>
              </div>
            </form>
            <form className="space-y-6" action="#">
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Street
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  defaultValue={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    City
                  </label>
                  <div className="relative">
                    <select
                      className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-city"
                      name="city_id"
                      defaultValue={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {cities.map((city) => {
                        return (
                          <option
                            key={city.id}
                            value={city.id}
                            className="h-24"
                          >
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Zip Code
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    defaultValue={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}
