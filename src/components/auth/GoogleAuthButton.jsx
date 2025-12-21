import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        try {
          const response = await api.post("/api/auth/google/", {
            access_token: res.credential,
          });

          localStorage.setItem("auth_token", response.data.key);

          await useAuthStore.getState().fetchUser();

          message.success("Logged in with Google");
          navigate("/");
        } catch (err) {
          console.error(err);
          message.error("Google login failed");
        }
      }}
      onError={() => {
        message.error("Google login cancelled");
      }}
    />
  );
}
