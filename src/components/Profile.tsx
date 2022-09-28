import { FunctionComponent, useEffect, useState } from "react";
import { getUser } from "../services/usersService";
import Navbar from "./Navbar";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    _id: "",
    isAdmin: false,
  });

  useEffect(() => {
    getUser()
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="card my-3" style={{ maxWidth: "40vw" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="plainUser.png"
              className="img-fluid rounded-start"
              width="200px"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              {user.isAdmin ? <p>This User Is An ADMIN</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
