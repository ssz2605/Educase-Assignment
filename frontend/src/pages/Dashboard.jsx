import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import camera from "../assets/camera.png";

function Dashboard() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://popx-assignment-sz6n.onrender.com/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error(err);
        logout();
        navigate("/");
      }
    };
    fetchUser();
  }, [token, navigate, logout]);

  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="bg-[#F7F8F9] w-full max-w-[400px] h-[650px] md:h-[700px] flex flex-col m-6">
        {/* Header */}
        <div className="bg-white w-full py-5 shadow-sm">
          <h1 className="text-[22px] md:text-[26px] font-bold text-[#1D2226] px-6">
            Account Settings
          </h1>
        </div>

        {/* Content (with spacing from header) */}
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex flex-col gap-5 px-6 mt-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={image}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <img
                  src={camera}
                  alt="camera"
                  className="w-7 h-7 absolute bottom-1 -right-3"
                />
              </div>
              {user && (
                <div className="ml-5">
                  <p className="text-[#1D2226] text-[18px] md:text-[20px] font-bold">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              )}
            </div>

            <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              molestiae distinctio eius laudantium earum consequuntur magni?
            </p>
            <div className="border-t border-dashed border-gray-400 mb-5" />
          </div>

          {/* Divider + Button */}
          <div>
            <div className="border-t border-dashed border-gray-400 mx-6 mb-5" />
            <div className="px-6 pb-6">
              <button
                className="w-full bg-[#6C25FF] hover:bg-[#5a1ee0] text-white text-[15px] font-medium py-3 rounded-lg transition duration-300"
                onClick={() => {
                  setUser(null);
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
