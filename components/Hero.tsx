"use client"

import { useState } from "react"

export default function Hero() {

  const [nome, setNome] = useState("")

  return (
    <div className="text-center">

      <h1 className="text-5xl font-bold">
        Meu SaaS de Cortes
      </h1>

      <p className="mt-4 text-gray-400">
        Transforme vídeos longos em cortes virais.
      </p>

      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        className="mt-6 w-full max-w-md rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none"
      />

      <p className="mt-4 text-xl text-white">
        Olá, {nome}
      </p>

      <button
        className="mt-6 rounded-lg bg-white px-6 py-3 text-black font-semibold"
      >
        Começar Agora
      </button>

    </div>
  )
}
