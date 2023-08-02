import Link from "next/link";

interface NavigationItem {
  text: string;
  href: string;
}
const NavigationSection = (props: NavigationItem) => {
  const href = props.href;
  const text = props.text;
  return (
    <li className="display-inline">
      <Link className="navLinks" href={href}>
        {text}
      </Link>
    </li>
  );
};

const NavigationBar = () => {
  return (
    <nav className="navBar">
      <span className="logo">🥘 HomeChefRecipes</span>
      <ul>
        <NavigationSection href="/" text="Home" />
        <div className="display-inline login-link-container">
          <NavigationSection href="/login" text="Login" />
        </div>
      </ul>
    </nav>
  );
};
export default NavigationBar;
