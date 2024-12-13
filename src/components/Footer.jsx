import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-4 text-center">
      <p className="text-sm text-gray-600 flex justify-center items-center gap-2 flex-wrap">
        © 2024 Japan Women's Football Intro • GPL-3.0 •
        <Link
          to="/about"
          className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
        >
          About
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
