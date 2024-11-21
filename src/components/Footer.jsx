const Footer = () => (
  <footer className="border-t mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-4 text-center">
      <p className="text-sm text-gray-600 flex justify-center items-center gap-2 flex-wrap">
        © 2024 Japan Women's Football Intro •{" "}
        <a
          href="https://github.com/b3ssle/Japan-Women-Football-Intro"
          className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>{" "}
        • GPL-3.0 •<a
          href="https://linktr.ee/b3ssle"
          className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          b3ssle
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;