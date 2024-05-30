
import { TitleBar } from "./TitleBar/TitleBar";
import { NavBar } from "./NavBar";
import "./Header.css";

export function Header() {

  return (
    <header className="header-container sticky-top">
      <TitleBar />
      <NavBar />
    </header>
  );
}
