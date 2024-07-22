import React, { useRef, useEffect } from "react";

type Location = {
  title: string;
  img: string | false;
  slug: string;
  lat: string;
  lng: string;
  list_typeprojet: string[];
  list_typeactivite: string[];
  list_techniqueprod: string[];
  list_typeprod: string[];
  cp: string;
  ville: string;
  ouvertpublic: string | null;
  prixsolidaires: string | null;
  hlm: string | null;
  qpv: string | null;
};

type ModalProps = {
  location: Location | null;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ location, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 m-6 rounded-lg max-w-lg w-full relative flex flex-col gap-4">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold hover:scale-110 hover:text-darkGreen">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{location.title}</h2>
        {location.img && <img src={location.img} alt={location.title} className="w-full h-auto mb-4" />}
        <p>
          {location.cp} {location.ville}
        </p>
        <p>
          <strong className="text-darkGreen">Type : </strong>
          {location.list_typeprojet.join(", ")}
        </p>
        {location.list_typeactivite.length > 0 && (
          <p>
            <strong className="text-darkGreen">Activités : </strong>
            {location.list_typeactivite.join(", ")}
          </p>
        )}
        {location.list_techniqueprod.length > 0 && (
          <p>
            <strong className="text-darkGreen">Technique de production : </strong>
            {location.list_techniqueprod.join(", ")}
          </p>
        )}
        {location.list_typeprod.length > 0 && (
          <p>
            <strong className="text-darkGreen">Type de production : </strong>
            {location.list_typeprod.join(", ")}
          </p>
        )}
        {location.ouvertpublic === "0" ? <p className="font-bold text-darkGreen">N'est pas ouvert au public</p> : <p className="font-bold text-darkGreen">Ouvert au public</p>}

        {/* Ajoutez plus d'informations ici selon vos besoins */}
      </div>
    </div>
  );
};

export default Modal;
