import { writeFile } from "fs/promises"
import path from "path"
import ffmpeg from "fluent-ffmpeg"

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe")

export async function POST(request: Request) {

  const formData = await request.formData()

  const arquivo = formData.get("video") as File

  if (!arquivo) {
    return Response.json({
      erro: "Arquivo não encontrado"
    })
  }

  // CONVERTE ARQUIVO EM BUFFER

  const bytes = await arquivo.arrayBuffer()

  const buffer = Buffer.from(bytes)

  // SALVA VÍDEO ORIGINAL

  const caminhoUpload = path.join(
    process.cwd(),
    "uploads",
    arquivo.name
  )

  await writeFile(caminhoUpload, buffer)

  // EXTRAIR ÁUDIO

  const nomeAudio = `audio-${Date.now()}.mp3`

  const caminhoAudio = path.join(
    process.cwd(),
    "audios",
    nomeAudio
  )

  await new Promise((resolve, reject) => {

    ffmpeg(caminhoUpload)

      .noVideo()

      .audioCodec("libmp3lame")

      .save(caminhoAudio)

      .on("end", () => {
        console.log("Áudio extraído")
        resolve(true)
      })

      .on("error", (erro) => {
        console.log("Erro ao extrair áudio")
        console.log(erro)
        reject(erro)
      })

  })

  // MOCK IA

  const transcricao = {
    text: `
    Hoje vou mostrar como crescer no Instagram.
    O maior erro das pessoas é desistir cedo.
    Se você postar consistentemente por 30 dias,
    seus resultados começam a aparecer.
    `
  }

  console.log("TRANSCRIÇÃO MOCK:")
  console.log(transcricao.text)

  // GERAR CLIP

  const nomeThumbnail = `thumb-${Date.now()}.png`

const caminhoThumbnail = path.join(
  process.cwd(),
  "public",
  "thumbnails",
  nomeThumbnail
)

await new Promise((resolve, reject) => {

  ffmpeg(caminhoUpload)

    .screenshots({
      count: 1,
      folder: path.join(process.cwd(), "public", "thumbnails"),
      filename: nomeThumbnail,
      size: "1280x720"
    })

    .on("end", () => {
      console.log("Thumbnail gerada")
      resolve(true)
    })

    .on("error", (erro) => {
      console.log("Erro thumbnail")
      console.log(erro)
      reject(erro)
    })

})

  const nomeClip = `clip-${Date.now()}.mp4`

  const caminhoClip = path.join(
    process.cwd(),
    "public",
    "clips",
    nomeClip
  )

  await new Promise((resolve, reject) => {

    ffmpeg(caminhoUpload)

      .setStartTime(0)

      .setDuration(15)

      .output(caminhoClip)

      .on("start", (comando) => {
        console.log("FFmpeg iniciado")
        console.log(comando)
      })

      .on("end", () => {
        console.log("Clip gerado com sucesso")
        resolve(true)
      })

      .on("error", (erro) => {
        console.log("Erro FFmpeg")
        console.log(erro)
        reject(erro)
      })

      .run()

  })

  return Response.json({
  mensagem: "Clip gerado com sucesso",
  clip: nomeClip,
  thumbnail: nomeThumbnail,
  transcricao: transcricao.text
})

}