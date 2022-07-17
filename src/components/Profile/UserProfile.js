import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";
import React from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const UserProfile = () => {
  const [changePassword, setChangePassword] = React.useState(false);

  return (
    <Card className={styles.profile}>
      <h1>Your User Profile</h1>
      <Button
        onClick={() => {
          setChangePassword((prev) => !prev);
        }}
      >
        Change Password
      </Button>
      {changePassword && <ProfileForm setChangePassword={setChangePassword} />}
    </Card>
  );
};

export default UserProfile;
