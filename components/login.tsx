import React, { useState } from "react";
import { Hide } from "./icons/hide";
import { Show } from "./icons/show";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const loginData = await response.json();
      console.log("Full Response Data:", loginData);

      if (loginData.message === "Connexion réussie") {
        // Utilisez les informations utilisateur renvoyées par l'API de connexion
        const userId = loginData.userId; // Assurez-vous que vous obtenez l'ID utilisateur
        if (!userId) {
          throw new Error("User ID is missing");
        }

        // Récupérer les données de l'utilisateur
        const userResponse = await fetch(`/api/user?id=${userId}`, {
          method: "GET",
        });

        if (!userResponse.ok) {
          const userErrorData = await userResponse.json();
          throw new Error(userErrorData.message || "Failed to fetch user data");
        }

        const userData = await userResponse.json();
        console.log("User Data:", userData);

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: userData._id,
            username: userData.username,
            email: userData.email,
          })
        );

        console.log("User information stored in localStorage:", localStorage.getItem("user"));

        // Rediriger vers la page profil
        window.location.href = "/profile";
      } else {
        console.error("Unexpected response:", loginData);
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 w-96 bg-white border-2 border-lightGreen rounded-xl">
      <h2>Se connecter</h2>
      <div>
        <label htmlFor="emailLogin">Email:</label>
        <input type="email" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded p-2 border-2 border-lightGreen w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="passwordLogin">Mot de passe :</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded p-2 border-2 border-lightGreen w-full"
          />
          <div id="show" onClick={togglePasswordVisibility} className="absolute right-4 cursor-pointer">
            {showPassword ? <Show size={24} color="fill-darkGreen" /> : <Hide size={24} color="fill-darkGreen" />}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
        Je me connecte !
      </button>
    </form>
  );
};

export default Login;
