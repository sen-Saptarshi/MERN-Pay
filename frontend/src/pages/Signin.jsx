import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { Popups } from "../components/Popups";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"JgVq5@example.com"}
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            placeholder={"12345"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                try {
                  const response = await axios.post(`${BASE_URL}/user/signin`, {
                    username,
                    password,
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (err) {
                  setIsOpenPopup(true);
                  console.log(err.response.data.message);
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>

      {isOpenPopup && ( <Popups msg={"Enter valid credentials"} closePopup={() => setIsOpenPopup(false)} btnText={"Ok"} />) }
    </div>


  );
}
