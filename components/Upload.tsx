"use client"

import { useEffect, useState } from "react"

export default function Upload() {

  const [arquivo, setArquivo] = useState<File | null>(null)

  const [carregando, setCarregando] = useState(false)

  const [progresso, setProgresso] = useState(0)

  const [clipGerado, setClipGerado] = useState("")

  const [momentos, setMomentos] = useState<string[]>([])

  const [historico, setHistorico] = useState<
    {
      clip: string
      thumbnail: string
    }[]
  >([])

  const [modalAberto, setModalAberto] = useState(false)

  const [clipSelecionado, setClipSelecionado] = useState("")

  useEffect(() => {

    const historicoSalvo = localStorage.getItem("clips-demo")

    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo))
    }

  }, [])

  useEffect(() => {

    localStorage.setItem("clips-demo", JSON.stringify(historico))

  }, [historico])

  async function enviarArquivo() {

    if (!arquivo) return

    setCarregando(true)

    setProgresso(0)

    const intervalo = setInterval(() => {

      setProgresso((valorAtual) => {

        if (valorAtual >= 100) {
          clearInterval(intervalo)
          return 100
        }

        return valorAtual + 10
      })

    }, 400)

    setTimeout(() => {

      const clipFake = "demo-clip.mp4"

      const thumbnailFake = "thumb-1.jpg"

      setClipGerado(clipFake)

      setHistorico((anterior) => [
        {
          clip: clipFake,
          thumbnail: thumbnailFake
        },
        ...anterior
      ])

      setMomentos([
        "A consistência vence o talento.",
        "Quem domina atenção domina vendas.",
        "Conteúdo curto gera mais retenção."
      ])

      setCarregando(false)

      clearInterval(intervalo)

    }, 4500)

  }

  function selecionarArquivo(
    evento: React.ChangeEvent<HTMLInputElement>
  ) {

    const arquivoSelecionado = evento.target.files?.[0]

    if (arquivoSelecionado) {
      setArquivo(arquivoSelecionado)
    }

  }

  function abrirModal(clip: string) {

    setClipSelecionado(clip)

    setModalAberto(true)

  }

  return (

    <section className="mx-auto mt-20 max-w-6xl px-6 pb-32">

      {/* UPLOAD */}

      <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white">
          Envie seu vídeo
        </h2>

        <p className="mt-3 text-gray-400">
          Nossa IA irá detectar automaticamente os melhores momentos.
        </p>

        <input
          type="file"
          accept="video/*"
          onChange={selecionarArquivo}
          className="mt-8 block w-full rounded-xl border border-gray-800 bg-black p-4 text-sm text-gray-400"
        />

        {arquivo && (

          <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">

            <p className="text-sm text-gray-500">
              Arquivo selecionado
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {arquivo.name}
            </p>

            <button
              onClick={enviarArquivo}
              disabled={carregando}
              className="mt-8 w-full rounded-2xl bg-green-500 px-6 py-4 font-bold text-black transition hover:scale-[1.01]"
            >
              {carregando
                ? "Processando IA..."
                : "Gerar Clips Automáticos"}
            </button>

            {carregando && (

              <div className="mt-8">

                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">

                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />

                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-400">

                  <p>Processando vídeo com IA...</p>

                  <p>{progresso}%</p>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

      {/* RESULTADO */}

      {clipGerado && (

        <div className="mt-12 rounded-3xl border border-green-500/20 bg-green-500/5 p-8">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>

              <video
                controls
                className="w-full rounded-2xl"
                src={`/demo/${clipGerado}`}
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-white">
                Momentos Detectados
              </h3>

              <div className="mt-6 space-y-4">

                {momentos.map((momento, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-800 bg-black p-5"
                  >

                    <p className="text-gray-300">
                      {momento}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* HISTÓRICO */}

      {historico.length > 0 && (

        <div className="mt-20">

          <div className="flex items-center justify-between">

            <h3 className="text-3xl font-bold text-white">
              Clips Gerados
            </h3>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
              IA ativa
            </span>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {historico.map((item, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900"
              >

                <img
                  src={`/demo-thumbnails/${item.thumbnail}`}
                  className="aspect-video w-full object-cover"
                />

                <div className="p-6">

                  <h4 className="text-lg font-bold text-white">
                    Clip Viral Detectado
                  </h4>

                  <p className="mt-2 text-sm text-gray-400">
                    Gerado automaticamente pela IA
                  </p>

                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() => abrirModal(item.clip)}
                      className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm text-white hover:bg-gray-800"
                    >
                      Preview
                    </button>

                    <a
                      href={`/demo/${item.clip}`}
                      download
                      className="flex-1 rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-bold text-black"
                    >
                      Download
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* MODAL */}

      {modalAberto && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">

          <div className="w-full max-w-5xl rounded-3xl bg-black p-6">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold text-white">
                Preview do Clip
              </h3>

              <button
                onClick={() => setModalAberto(false)}
                className="text-gray-400 hover:text-white"
              >
                Fechar
              </button>

            </div>

            <video
              controls
              autoPlay
              className="mt-6 w-full rounded-2xl"
              src={`/demo/${clipSelecionado}`}
            />

          </div>

        </div>

      )}

    </section>

  )
}