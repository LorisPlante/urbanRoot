"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ _id: string; username: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les informations de l'utilisateur depuis le localStorage
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
        // Si les informations utilisateur ne sont pas trouvées, réinitialiser l'état utilisateur
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="p-8 w-96 bg-white border-2 border-lightGreen rounded-xl">
        <p>No user data found. Please log in.</p>
      </div>
    );
  }

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <section className="w-full p-mobile sm:p-desktop flex flex-wrap justify-center items-center flex-col lg:flex-row gap-4">
          <div className="p-8 w-96 bg-white border-2 border-lightGreen rounded-xl flex flex-col gap-4">
            <h1>Profile</h1>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
