import { FaGithub, FaRocket } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-center items-center gap-2">
      <button className="flex justify-center items-center gap-2">
        <FaGithub /> GitHub
        <a
          href="https://github.com/horaciosdev/react-notes"
          target="_blank"
        ></a>
      </button>{" "}
      <button className="flex justify-center items-center gap-2">
        <FaRocket /> Other Projects
        <a href="https://my-portfolio-ten-navy.vercel.app/" target="_blank"></a>
      </button>
    </header>
  );
}
