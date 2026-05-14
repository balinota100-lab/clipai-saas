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

    const historicoSalvo = localStorage.getItem("clips")

    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo))
    }

  }, [])

  useEffect(() => {

    localStorage.setItem("clips", JSON.stringify(historico))

  }, [historico])

  async function enviarArquivo() {

    if (!arquivo) return

    setCarregando(true)

    setProgresso(10)

    const intervalo = setInterval(() => {

      setProgresso((valorAtual) => {

        if (valorAtual >= 90) return 90

        return valorAtual + 10
      })

    }, 500)

    const formData = new FormData()

    formData.append("video", arquivo)

    const resposta = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    const dados = await resposta.json()

    clearInterval(intervalo)

    setProgresso(100)

    setClipGerado(dados.clip)

    setHistorico((anterior) => [
      {
        clip: dados.clip,
        thumbnail: dados.thumbnail
      },
      ...anterior
    ])

    setMomentos([
      "O maior erro das pessoas é desistir cedo",
      "Se você postar consistentemente por 30 dias",
      "A maioria falha por falta de consistência"
    ])

    setTimeout(() => {
      setCarregando(false)
      setProgresso(0)
    }, 800)

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

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">

        <h2 className="text-3xl font-bold text-white">
          Envie seu vídeo
        </h2>

        <p className="mt-3 text-gray-400">
          Gere cortes automáticos usando IA.
        </p>

        <input
          type="file"
          accept="video/*"
          onChange={selecionarArquivo}
          className="mt-6 block w-full text-sm text-gray-400"
        />

        {arquivo && (

          <div className="mt-6 rounded-xl border border-gray-800 bg-black p-5">

            <p className="text-white">Arquivo selecionado:</p>

            <p className="mt-2 text-gray-400">{arquivo.name}</p>

            <button
              onClick={enviarArquivo}
              disabled={carregando}
              className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black"
            >
              {carregando ? "Processando..." : "Gerar Clip"}
            </button>

            {carregando && (
              <div className="mt-6">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Processando vídeo...
                </p>
              </div>
            )}

          </div>

        )}

      </div>

      {/* RESULTADO PRINCIPAL */}

      {clipGerado && (

        <div className="mt-10 rounded-2xl border border-green-500/20 bg-green-500/5 p-8">

          <div className="flex flex-col gap-8 lg:flex-row">

            <div className="flex-1">

              <video
                controls
                className="w-full rounded-2xl"
                src={`/clips/${clipGerado}`}
              />

            </div>

            <div className="w-full lg:w-96">

              <h3 className="text-2xl font-bold text-white">
                Momentos Detectados
              </h3>

              <div className="mt-6 space-y-4">

                {momentos.map((momento, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-800 bg-black p-4"
                  >
                    <p className="text-gray-300">{momento}</p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* HISTÓRICO */}

      {historico.length > 0 && (

        <div className="mt-16">

          <h3 className="text-3xl font-bold text-white">
            Clips Recentes
          </h3>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {historico.map((item, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
              >

                <img
                  src={`/thumbnails/${item.thumbnail}`}
                  className="aspect-video w-full object-cover"
                />

                <div className="p-5">

                  <h4 className="text-lg font-semibold text-white">
                    Clip gerado automaticamente
                  </h4>

                  <p className="mt-2 text-sm text-gray-400 truncate">
                    {item.clip}
                  </p>

                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() => abrirModal(item.clip)}
                      className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm text-white hover:bg-gray-800"
                    >
                      Preview
                    </button>

                    <a
                      href={`/clips/${item.clip}`}
                      download
                      className="flex-1 rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-semibold text-black"
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

          <div className="w-full max-w-4xl rounded-2xl bg-black p-6">

            <div className="flex items-center justify-between">

              <h3 className="text-white font-bold">
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
              className="mt-6 w-full rounded-xl"
              src={`/clips/${clipSelecionado}`}
            />

          </div>

        </div>

      )}

    </section>
  )
}