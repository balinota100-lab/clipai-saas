const funcionalidades = [
  {
    titulo: "Cortes Automáticos",
    descricao: "A IA encontra os melhores momentos do vídeo automaticamente."
  },
  {
    titulo: "Legendas Inteligentes",
    descricao: "Legendas automáticas prontas para TikTok e Reels."
  },
  {
    titulo: "Exportação Vertical",
    descricao: "Vídeos prontos em formato 9:16 para redes sociais."
  }
]

export default function Features() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">

      {funcionalidades.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
        >
          <h2 className="text-2xl font-bold text-white">
            {item.titulo}
          </h2>

          <p className="mt-4 text-gray-400">
            {item.descricao}
          </p>
        </div>
      ))}

    </section>
  )
}