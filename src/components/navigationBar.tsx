import Link from "next/link";

interface NavigationItem {
  text: string;
  href: string;
  background?: boolean;
}

interface NavigationBarProps {
  background?: boolean;
  roundEdges?: boolean;
}
const NavigationButton = (props: NavigationItem) => {
  const href = props.href;
  const text = props.text;
  const background = props.background;
  return (
    <Link
      className={`navLinks ${background ? "navLinkBackground" : ""}`}
      href={href}
    >
      {text}
    </Link>
  );
};

const NavigationBar = (props: NavigationBarProps) => {
  return (
    <nav
      className={`navBar ${props.background ? "nav-bar-background" : ""} ${
        props.roundEdges ? "roundEdges" : ""
      }`}
    >
      <span className="logo">🥘 HomeChefRecipes</span>
      <div className="navigation-links-container">
        <NavigationButton href="/" text="Home" />
        <NavigationButton background={true} href="/login" text="Login" />
      </div>
    </nav>
  );
};
export default NavigationBar;
