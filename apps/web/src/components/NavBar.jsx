import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  // Fonction de gestion de la classe active sur les liens de navigation
  const lienActif = ({ isActive }) =>
    isActive ? `${styles.lien} ${styles.lienActif}` : styles.lien;

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SenEvent</div>
      <div className={styles.liens}>
        {/* L'attribut end empêche le lien "/" d'être marqué actif en permanence */}
        <NavLink to="/" end className={lienActif}>
          Accueil
        </NavLink>
        <NavLink to="/nouveau" className={lienActif}>
          Nouvel evenement
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;