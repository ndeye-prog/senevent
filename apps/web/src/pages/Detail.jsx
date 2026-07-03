import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = ({ evenements }) => {
  // 1. Récupération du paramètre ":id" défini dans la route de App.jsx
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Recherche de l'événement correspondant (Cast obligatoire en Number)
  const evenement = evenements.find((ev) => ev.id === Number(id));

  // 3. Gestion du cas où l'ID fourni ne correspond à aucun événement connu
  if (!evenement) {
    return (
      <div className={styles.container}>
        <p>Evenement introuvable .</p>
        <Link to="/" className={styles.retour}>Retour a la liste</Link>
      </div>
    );
  }

  // 4. Formatage local des variables d'affichage
  const prix = evenement.prix === 0 ? " Gratuit " : `${evenement.prix} FCFA `;
  const date = new Date(evenement.date_debut).toLocaleString("fr-FR");

  return (
    <div className={styles.container}>
      {/* Bouton de retour exploitant l'historique de navigation */}
      <button onClick={() => navigate(-1)} className={styles.retour}>
        &lt; - Retour
      </button>
      
      <h1 className={styles.titre}>{evenement.titre}</h1>
      <p className={styles.meta}>
        <span className={styles.categorie}>{evenement.categorie}</span>
      </p>
      
      <img
        src={evenement.image_url}
        alt={evenement.titre}
        className={styles.image}
      />
      
      {/* Liste de description pour structurer les métadonnées de l'événement */}
      <dl className={styles.infos}>
        <dt>Lieu</dt> <dd>{evenement.lieu_nom}</dd>
        <dt>Date</dt> <dd>{date}</dd>
        <dt>Prix</dt> <dd className={styles.prix}>{prix}</dd>
      </dl>
    </div>
  );
};

export default Detail;