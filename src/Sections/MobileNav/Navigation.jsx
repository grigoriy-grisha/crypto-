import NavLinks from "./NavLinks";
import styles from './css/Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={styles.Navigation}>
            <NavLinks/>
        </nav>
    );
};

export default Navigation;