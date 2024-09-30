import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

function Share() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      window.location.href = "http://localhost:4000/auth/spotify/login";
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = axios.post(
        "http://localhost:4000/playlist/share",
        formData,
        {
          withCredentials: true,
        }
      );
      const data = await response;

      console.log("share playlist called");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" justify-center flex flex-col items-center overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-6 md:w-96 shadow py-16 flex flex-col gap-4 rounded-3xl">
            <div>
              <h1 className="text-3xl text-black font-bold">
                Share Your Playlist
              </h1>
              <p>
                Before clicking add, please click on authorize otherwise it will
                throw an error (only once)
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <input
                onChange={handleChange}
                value={formData.title}
                className="px-4 py-2 border border-zinc-300 shadow-sm rounded-xl"
                type="text"
                placeholder="Title"
                name="title"
              />

              <input
                onChange={handleChange}
                value={formData.link}
                className="px-4 py-2 border border-zinc-300 shadow-sm rounded-xl"
                type="text"
                placeholder="Link"
                name="link"
              />
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className="text-nowrap hover:bg-gray-100 shadow text-black border rounded-xl px-6 py-2 font-[500] text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-black flex items-center gap-2 hover:bg-zinc-800 shadow text-nowrap text-white rounded-xl px-6 py-2 font-[500] text-sm"
              >
                Add
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center items-center mt-4">
          <button
            type="reset"
            onClick={handleLogin}
            className="bg-black flex h-8 items-center gap-2 hover:bg-zinc-800 shadow text-nowrap text-white rounded-xl px-6 py-2 font-[500] text-sm"
          >
            Authorize
            <MdOutlineSecurity />
          </button>
        </div>
      </div>
    </>
  );
}

export default Share;
