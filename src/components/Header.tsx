import { FaGithub, FaRocket } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-gray-800 p-1 flex justify-center items-center gap-2">
      <a href="https://github.com/horaciosdev/react-notes" target="_blank">
        <button className="bg-gray-800 text-gray-300 flex justify-center items-center gap-1 border border-gray-400 rounded-md pl-2 pr-2 hover:invert">
          <FaGithub /> GitHub
        </button>
      </a>
      <a href="https://my-portfolio-ten-navy.vercel.app/" target="_blank">
        <button className="bg-gray-800 text-gray-300 flex justify-center items-center gap-1 border border-gray-400 rounded-md pl-2 pr-2 hover:invert">
          <FaRocket /> Other Projects
        </button>
      </a>
    </header>
  );
}
