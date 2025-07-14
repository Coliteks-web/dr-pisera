"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const text = "Już wkrótce...";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function ComingSoon() {
  return (
    <main style={styles.main}>
      <Image
        src="/images/webp/logo.webp"
        alt="Logo"
        width={600}
        height={600}
        style={{
          borderRadius: "50%",
          maxWidth: "100%",
          height: "auto",
          display: "block",
        }}
        priority
      />

      <div className="loader" />

      <motion.h1
        style={styles.title}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1.5rem",
    textAlign: "center",
    padding: "0 1rem",
  },
  title: {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    fontWeight: 100,
    fontStyle: "italic",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "0.2em",
    margin: 0,
  },
};
