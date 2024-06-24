import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { UsersComponent } from "../components/UsersComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import { Popups } from "../components/Popups";

export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("");
  const [username, setUsername] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      try {
        axios
          .get(`${BASE_URL}/account/balance`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setUsername(response.data.username);
            setBalance(response.data.balance);
          });
      } catch (err) {
        setIsOpenPopup(true);
      }
    }
  }, []);
  return (
    <div>
      <Appbar username={username} />
      <div className="m-8">
        <Balance value={balance.toLocaleString("en-IN")} />
        <UsersComponent me={username} />
      </div>
      {isOpenPopup && (
        <Popups
          msg={"Something went wrong. Please try again."}
          btnText={"Go to Signin"}
          closePopup={() => navigate("/signin")}
        />
      )}
    </div>
  );
}
