import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import { Popups } from "../components/Popups";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"John"}
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Doe"}
            label={"Last Name"}
          />
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
              label={"Sign Up"}
              onClick={async () => {
                try {
                  const response = await axios.post(`${BASE_URL}/user/signup`, {
                    username,
                    firstName,
                    lastName,
                    password,
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (e) {
                  setIsOpenPopup(true);
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
      {isOpenPopup && <Popups msg={"We couldn't create your account"} btnText={"Lemme Try Again"} closePopup={() => setIsOpenPopup(false)} />}
    </div>
  );
}
