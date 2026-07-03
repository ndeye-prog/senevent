import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NouvelEvenement.module.css";

const NouvelEvenement = ({ onAjouter }) => {
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("concert");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState("");

  // État pour gérer les messages d'erreur de validation
  const [erreurs, setErreurs] = useState({});

  // Fonction de validation locale
  const valider = () => {
    const erreursTrouvees = {};
    if (!titre.trim()) erreursFound.titre = "Le titre est obligatoire.";
    if (!lieu.trim()) erreursTrouvees.lieu = "Le lieu est obligatoire.";
    if (!prix.trim() || isNaN(prix) || Number(prix) < 0) {
      erreursTrouvees.prix = "Le prix doit être un nombre positif ou 0.";
    }
    return erreursTrouvees;
  };

  const soumettre = (event) => {
    event.preventDefault();

    const erreursTrouvees = valider();
    if (Object.keys(erreursTrouvees).length > 0) {
      setErreurs(erreursTrouvees);
      return; // Bloque l'ajout si erreur
    }

    // Création de l'objet événement avec les données saisies
    const nouvel = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      titre: titre.trim(),
      categorie,
      lieu_nom: lieu.trim(),
      prix: Number(prix),
      date_debut: new Date().toISOString(),
      image_url: `https://picsum.photos/400/250?random=${Date.now()}`,
    };

    // Remontée de l'état vers App.jsx
    onAjouter(nouvel);

    // Redirection automatique vers l'accueil
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titrePage}>Créer un nouvel événement</h1>
      
      <form onSubmit={soumettre} className={styles.formulaire}>
        <div className={styles.champ}>
          <label htmlFor="titre">Titre de l'événement</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className={erreurs.titre ? styles.inputErreur : ""}
          />
          {erreurs.titre && <span className={styles.texteErreur}>{erreurs.titre}</span>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="categorie">Catégorie</label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="concert">Concert</option>
            <option value="expo">Exposition</option>
            <option value="theatre">Théâtre</option>
            <option value="festival">Festival</option>
          </select>
        </div>

        <div className={styles.champ}>
          <label htmlFor="lieu">Lieu</label>
          <input
            type="text"
            id="lieu"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            className={erreurs.lieu ? styles.inputErreur : ""}
          />
          {erreurs.lieu && <span className={styles.texteErreur}>{erreurs.lieu}</span>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="prix">Prix (FCFA) — 0 pour Gratuit</label>
          <input
            type="number"
            id="prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className={erreurs.prix ? styles.inputErreur : ""}
            placeholder="Ex: 3000"
          />
          {erreurs.prix && <span className={styles.texteErreur}>{erreurs.prix}</span>}
        </div>

        <button type="submit" className={styles.boutonSoumettre}>
          Ajouter l'événement
        </button>
      </form>
    </div>
  );
};

export default NouvelEvenement;