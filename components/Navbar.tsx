export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <h1 className="text-xl font-bold text-white">
          ClipFlow
        </h1>

        <nav className="flex gap-6 text-sm text-gray-300">
          <a href="#">Home</a>
          <a href="#">Funcionalidades</a>
          <a href="#">Preços</a>
        </nav>

      </div>
    </header>
  )
}