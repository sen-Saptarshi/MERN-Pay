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

export default function Update() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
          <Heading label={"Update Profile"} />
          <SubHeading label={"Enter new information to update your profile"} />
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
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            placeholder={"12345"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Update"}
              onClick={async () => {
                if (!localStorage.getItem("token")) {
                  navigate("/signin");
                } else {
                  try {
                    if (!firstName || !lastName || !password) {
                      setIsOpenPopup(true);
                      return;
                    }
                    const response = await axios.put(
                      `${BASE_URL}/user/update`,
                      {
                        firstName,
                        lastName,
                        password,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    setIsUpdated(true);
                    setIsOpenPopup(true);
                  } catch (e) {
                    setIsUpdated(false);
                    setIsOpenPopup(true);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      {isOpenPopup && (
        <Popups
          msg={isUpdated ? "Profile Updated" : "Something went wrong"}
          btnText={isUpdated ? "Ok" : "Try Again"}
          closePopup={() => {
            navigate("/dashboard");
          }}
          variant={isUpdated ? "success" : "error"}
        />
      )}
    </div>
  );
}
