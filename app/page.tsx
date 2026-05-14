import Upload from "@/components/Upload"

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white">

      {/* HEADER FIXO */}

      <header className="sticky top-0 z-50 border-b border-gray-900 bg-black/80 backdrop-blur">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-bold text-green-400">
            ClipAI
          </h1>

          <div className="flex items-center gap-3">

            <a
              href="https://github.com/"
              target="_blank"
              className="rounded-xl border border-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
            >
              GitHub
            </a>

            <a
              href="#sobre"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-black"
            >
              Sobre o projeto
            </a>

          </div>

        </div>

      </header>

      {/* HERO DO PORTFÓLIO */}

      <section className="mx-auto max-w-6xl px-6 pt-16">

        <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-green-500/20 to-black p-10">

          <h2 className="text-5xl font-bold leading-tight">
            SaaS de cortes automáticos
            <span className="block text-green-400">
              com IA e FFmpeg
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">

            Projeto desenvolvido com Next.js, Node.js e processamento de vídeo.
            Gera clips automáticos e thumbnails a partir de vídeos enviados pelo usuário.

          </p>

          <div className="mt-8 flex gap-4">

            <div className="rounded-xl border border-gray-800 bg-black px-5 py-3">
              <p className="text-sm text-gray-500">Stack</p>
              <p className="text-white">Next.js + FFmpeg</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black px-5 py-3">
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="text-white">SaaS IA</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black px-5 py-3">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-green-400">Portfolio</p>
            </div>

          </div>

        </div>

      </section>

      {/* SOBRE O PROJETO */}

      <section id="sobre" className="mx-auto mt-20 max-w-6xl px-6">

        <h3 className="text-3xl font-bold">Sobre o projeto</h3>

        <div className="mt-6 space-y-4 text-gray-400">

          <p>
            Este projeto simula um SaaS de geração automática de clips curtos
            a partir de vídeos longos, utilizando processamento com FFmpeg.
          </p>

          <p>
            O sistema realiza upload de vídeo, extrai áudio, gera thumbnails,
            cria cortes automáticos e exibe tudo em um dashboard moderno.
          </p>

          <p>
            O objetivo foi treinar desenvolvimento full-stack com foco em
            aplicações reais de mercado e UX moderna.
          </p>

        </div>

      </section>

      {/* DASHBOARD */}

      <Upload />

      {/* FOOTER */}

      <footer className="mt-24 border-t border-gray-900 py-10 text-center text-sm text-gray-500">

        Desenvolvido para portfólio — Next.js + FFmpeg + IA

      </footer>

    </main>

  )
}