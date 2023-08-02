import Link from "next/link";

interface NavigationItem {
  text: string;
  href: string;
}
const NavigationSection = (props: NavigationItem) => {
  const href = props.href;
  const text = props.text;
  return (
    <li className="navLinks">
      <Link href={href}>{text}</Link>
    </li>
  );
};

const NavigationBar = () => {
  return (
    <nav className="navBar">
      <span className="logo">🥘 HomeChefRecipes</span>
      <ul>
        <NavigationSection href="/" text="Home" />
        <NavigationSection href="/login" text="Login" />
      </ul>
    </nav>
  );
};
export default NavigationBar;
