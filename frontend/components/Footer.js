const Footer = () => {
  return (
    <div className="flex justify-between m-6">
      <p className="text-xs font-semibold text-gray-600">
        web project for COMP 426 — Sayan Dutta
      </p>
      <div className="flex gap-3 ml-4">
        {/* <a href="https://twitter.com/strapijs" className="max-w-xs ml-4">
          <img src="/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://facebook.com/strapijs" className="ml-3">
          <img src="/facebook.svg" alt="Facebook" />
        </a> */}
        <a
          href="https://github.com/supersayan"
          className="ml-3"
        >
          <img src="/github.svg" alt="GitHub" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
