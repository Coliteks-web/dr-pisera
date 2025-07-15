"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const text = "Już wkrótce...";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
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
  <div style={styles.imageWrapper}>
    <Image
      src="/images/webp/logo.webp"
      alt="Logo"
      width={800}
      height={800}
      style={styles.image}
      priority
    />

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
  </div>
  <div style={styles.loaderWrapper}>
    <div className="loader" />
  </div>
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
    gap: "0.5rem",
    textAlign: "center",
    padding: "0 1rem",
  },
  title: {
  position: "absolute",
  top: "75%", // niżej na obrazku – możesz dostosować np. 70%, 80%
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "clamp(0.5rem, 5vw, 2rem)",
  fontWeight: 100,
  fontStyle: "italic",
  fontFamily: "'Poppins', sans-serif",
  letterSpacing: "0.2em",
  margin: 0,
  color: "#fff",
  pointerEvents: "none",
  textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
  whiteSpace: "nowrap",
  maxWidth: "90vw",
  overflow: "hidden",
},
imageWrapper: {
  position: "relative",
  width: "100%",
  maxWidth: "600px", // możesz zmienić na 800px dla desktop
  aspectRatio: "1 / 1", // zapewnia proporcje jak zdjęcie
},

image: {
  borderRadius: "50%",
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover",
},
};
