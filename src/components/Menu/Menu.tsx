import { Link } from "react-router-dom";
import "./Menu.css";
import MenuElement from "./MenuElement/MenuElement";

export default function Menu() {
  return (
    <div className="Menu">
      <div className="logo">
        <h1>The Perfect Bid</h1>
      </div>
      <div className="menu-elements">
        <Link to="/gestion-productos" className="menu-link">
          <MenuElement text="Gestión de productos" icon="/Product.svg" />
        </Link>
        <Link to="/gestion-subastas" className="menu-link">
          <MenuElement text="Gestión de subastas" icon="/Marketplace.png" />
        </Link>
      </div>
      <div className="settings">
        <Link to="/gestion-roles">
          <button className="icon-button">
            <img src="/setting.svg" alt="Settings" />
          </button>
        </Link>
        <Link to="/" className="icon-button">
          <img src="/exit.svg" alt="Profile" />
        </Link>
        <Link to="/perfil" className="icon-button">
          <img src="/userprofile.svg" alt="Profile" />
        </Link>
      </div>
    </div>
  );
}
