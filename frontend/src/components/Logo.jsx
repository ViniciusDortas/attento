import attentoLogomarca from "../assets/attento-logomarca.png";

// Logo horizontal. No modo escuro, o filtro deixa a imagem branca.
export default function Logo({ dark = false, height = 40 }) {
  return (
    <img
      src={attentoLogomarca}
      alt="Attento Saúde Integral"
      className="select-none"
      style={{ height, width: "auto", filter: dark ? "brightness(0) invert(1)" : "none" }}
    />
  );
}
