"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Loader } from "@/components/icons/loader";
import { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ _id: string; username: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
          <section className="w-full p-mobile sm:p-desktop flex flex-col justify-center items-center gap-4">
            <Loader size={44} color="fill-darkGreen" />
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    window.location.href = "/connexion";
  }

  const disconnectUser = async () => {
    try {
      // Optionnel : Appelez l'API de déconnexion
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // Effacez les données utilisateur du stockage local
      localStorage.removeItem("user");

      // Redirigez vers la page de connexion
      window.location.href = "/connexion";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-col justify-center items-center gap-4">
          <div className="p-8 w-96 bg-white border-2 border-lightGreen rounded-xl flex flex-col gap-4">
            <h1 className="text-3xl">Profile</h1>
            <div>
              <strong>Pseudo :</strong> {user?.username}
            </div>
            <div>
              <strong>Email :</strong> {user?.email}
            </div>

            <button
              onClick={disconnectUser}
              className="bg-lightGreen font-bold hover:bg-darkGreen hover:text-secondary transition-all duration-300 block mx-auto w-fit px-4 py-2 rounded">
              Déconnexion
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
