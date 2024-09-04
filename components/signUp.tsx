import React, { useState } from "react";
import { Show } from "./icons/show";
import { Hide } from "./icons/hide";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage("Votre compte a été créé avec succès ! Veuillez maintenant vous connecter.");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 p-8 w-96 bg-white border-2 border-lightGreen rounded-xl">
      <h2>Création de compte</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Pseudo:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="rounded p-2 border-2 border-lightGreen" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="emailSignUp">Email:</label>
        <input type="email" id="emailSignUp" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded p-2 border-2 border-lightGreen" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="passwordSignUp">Mot de passe :</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            id="passwordSignUp"
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
      {successMessage && <p className="text-darkGreen">{successMessage}</p>}
      <button type="submit" className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
        {`Je m'inscris !`}
      </button>
    </form>
  );
};

export default Signup;
