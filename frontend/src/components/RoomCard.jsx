import { useState } from "react";
import { descricaoCurta, precoMinimo } from "../data/salas.js";
import { IconChevronLeft, IconChevronRight, IconHeart } from "./icons.jsx";

// Card de uma sala no catálogo. Recebe a sala por "props".
export default function RoomCard({ sala, dark, onSelect }) {
  const [foto, setFoto] = useState(0); // índice da foto que está aparecendo
  const [favorita, setFavorita] = useState(false);

  const total = sala.fotos.length;

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:-translate-y-1"
      style={{
        background: dark ? "#1e2533" : "#ffffff",
        boxShadow: dark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(91,136,197,0.1), 0 1px 4px rgba(0,0,0,0.06)",
      }}
      onClick={() => onSelect(sala)}
    >
      {/* Foto */}
      <div className="relative overflow-hidden" style={{ height: 220, background: "#dce8f7" }}>
        <img
          src={sala.fotos[foto]}
          alt={sala.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Setas pra trocar de foto */}
        {total > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={(e) => {
                e.stopPropagation(); // não deixa o clique "vazar" pro card (que abriria a sala)
                setFoto((f) => (f - 1 + total) % total);
              }}
              aria-label="Foto anterior"
            >
              <IconChevronLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setFoto((f) => (f + 1) % total);
              }}
              aria-label="Próxima foto"
            >
              <IconChevronRight />
            </button>

            {/* Bolinhas */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {sala.fotos.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === foto ? 16 : 6,
                    height: 6,
                    background: i === foto ? "white" : "rgba(255,255,255,0.55)",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Coração (favoritar) */}
        <button
          className="absolute top-3 right-3 p-1 transition-transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setFavorita((f) => !f);
          }}
          aria-label="Favoritar"
        >
          <IconHeart filled={favorita} />
        </button>

        {/* Selo de disponibilidade */}
        <div className="absolute top-3 left-3">
          {sala.poucosHorarios ? (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Poucos horários</span>
          ) : sala.disponivel ? (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Disponível hoje</span>
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-600">Sem vagas hoje</span>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base" style={{ color: dark ? "#f0f4f8" : "#1a1a1a" }}>
            {sala.nome}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
            style={{ background: "#dce8f7", color: "#3d6aa8" }}
          >
            {sala.unidade === "Jardim Europa" ? "JE" : "HJ"}
          </span>
        </div>
        <p className="text-sm mb-3" style={{ color: dark ? "#8a9ab5" : "#666" }}>
          {descricaoCurta(sala)}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs" style={{ color: dark ? "#8a9ab5" : "#999" }}>
              A partir de
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg" style={{ color: dark ? "#a8c4e8" : "#5B88C5" }}>
                R$ {precoMinimo(sala)}
              </span>
              <span className="text-xs" style={{ color: dark ? "#8a9ab5" : "#999" }}>
                / turno
              </span>
            </div>
          </div>
          <button className="text-sm px-4 py-2 rounded-xl transition-colors text-white bg-[#5B88C5] hover:bg-[#3d6aa8]">
            Ver sala
          </button>
        </div>
      </div>
    </div>
  );
}
