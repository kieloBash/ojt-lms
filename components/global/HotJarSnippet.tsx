"use client";
import Hotjar from "@hotjar/browser";

const HotJarSnippet = () => {
  const hjid = 3882899;
  const hjsv = 6;

  const h = Hotjar.init(hjid, hjsv);

  if (!h) return <></>;
  // Initializing with `debug` option:
  Hotjar.init(hjid, hjsv, {
    debug: true,
  });

  return <></>;
};

export default HotJarSnippet;
