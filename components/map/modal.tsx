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

interface LocationProps {
  list_typeprojet: Array<string>;
}

const Modal: React.FC<ModalProps> = ({ location, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const renderProjectType = (type: string): JSX.Element | null => {
    switch (type) {
      case "jardin-potager":
        return <span>Jardin / Potager</span>;
      case "ferme-urbaine-participative":
        return <span>Ferme urbaine participative</span>;
      case "ferme-urbaine-specialisee":
        return <span>Ferme urbaine spécialisée</span>;
      default:
        return null;
    }
  };

  const projectTypesJSX = location?.list_typeprojet.map((type) => renderProjectType(type)).filter((element): element is JSX.Element => element !== null);

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
      <div ref={modalRef} className="bg-white p-6 m-6 rounded-lg max-w-lg w-full max-h-[calc(100vh-48px)] overflow-y-auto relative flex flex-col gap-4">
        <button onClick={onClose} className="absolute top-0 right-2 text-4xl font-bold transition-all duration-300 hover:scale-125 hover:text-darkGreen">
          &times;
        </button>
        <span className="text-2xl font-bold font-tanker tracking-widest leading-1 mb-4">{location.title}</span>
        {location.img && <img src={location.img} alt={location.title} className="w-3/4 mx-auto block" />}
        <p>
          {location.cp} {location.ville}
        </p>
        <p>
          <strong className="text-darkGreen">Type : </strong>
          {projectTypesJSX?.reduce((prev, curr, index) => (
            <>
              {prev}
              {index > 0 && ", "}
              {curr}
            </>
          ))}
        </p>
        {location.list_typeactivite.length > 0 && (
          <p>
            <strong className="text-darkGreen">Activités : </strong>
            {location.list_typeactivite.map((type) => type.replace(/-/g, " ")).join(", ")}
          </p>
        )}
        {location.list_techniqueprod.length > 0 && (
          <p>
            <strong className="text-darkGreen">Technique de production : </strong>
            {location.list_techniqueprod.map((type) => type.replace(/-/g, " ")).join(", ")}
          </p>
        )}
        {location.list_typeprod.length > 0 && (
          <p>
            <strong className="text-darkGreen">Type de production : </strong>
            {location.list_typeprod.map((type) => type.replace(/-/g, " ")).join(", ")}
          </p>
        )}
        <p>
          <strong className="text-darkGreen">Accès : </strong>
          {location.ouvertpublic === "0" ? <span>{`N'est pas ouvert au public`}</span> : <span>Ouvert au public</span>}
        </p>
      </div>
    </div>
  );
};

export default Modal;
