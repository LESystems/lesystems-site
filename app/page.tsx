export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold">LESystems</h1>
          <p className="text-sm text-cyan-400">Engenharia de Software</p>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="#inicio" className="hover:text-cyan-400">
            Início
          </a>
          <a href="#servicos" className="hover:text-cyan-400">
            Serviços
          </a>
          <a href="#sobre" className="hover:text-cyan-400">
            Sobre
          </a>
          <a href="#contato" className="hover:text-cyan-400">
            Contato
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="flex min-h-[75vh] items-center justify-center px-8 text-center"
      >
        <div className="max-w-4xl">
          <p className="mb-4 text-cyan-400">
            TECNOLOGIA • SOFTWARE • INOVAÇÃO
          </p>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Transformamos ideias em
            <span className="text-cyan-400"> soluções digitais</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Desenvolvimento de sistemas, sites, aplicações e soluções
            personalizadas para empresas que querem evoluir através da
            tecnologia.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#servicos"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Conheça nossos serviços
            </a>

            <a
              href="https://wa.me/5521976160256"
              target="_blank"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-slate-900 px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Nossos Serviços
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-950 p-7">
              <h3 className="mb-3 text-xl font-semibold text-cyan-400">
                Desenvolvimento Web
              </h3>
              <p className="text-slate-300">
                Sites modernos, rápidos, responsivos e preparados para apresentar
                sua empresa de forma profissional.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950 p-7">
              <h3 className="mb-3 text-xl font-semibold text-cyan-400">
                Sistemas Personalizados
              </h3>
              <p className="text-slate-300">
                Sistemas desenvolvidos de acordo com as necessidades e processos
                específicos de cada empresa.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950 p-7">
              <h3 className="mb-3 text-xl font-semibold text-cyan-400">
                Automação de Processos
              </h3>
              <p className="text-slate-300">
                Soluções para reduzir tarefas repetitivas e aumentar a eficiência
                das operações.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold">Sobre a LESystems</h2>

          <p className="text-lg leading-8 text-slate-300">
            A LESystems nasce com o objetivo de desenvolver soluções tecnológicas
            eficientes, modernas e personalizadas. Nosso foco é utilizar a
            Engenharia de Software para transformar necessidades reais em
            sistemas que gerem resultados.
          </p>
        </div>
      </section>

      <section id="contato" className="bg-slate-900 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold">Entre em contato</h2>

          <p className="mb-8 text-slate-300">
            Tem uma ideia ou precisa desenvolver um sistema? Fale com a LESystems.
          </p>

          <div className="space-y-3 text-lg">
            <p>
              WhatsApp:{" "}
              <a
                className="text-cyan-400"
                href="https://wa.me/5521976160256"
                target="_blank"
              >
                (21) 97616-0256
              </a>
            </p>

            <p>
              E-mail:{" "}
              <a
                className="text-cyan-400"
                href="mailto:contato.lesystems@gmail.com"
              >
                contato.lesystems@gmail.com
              </a>
            </p>

            <p>
              Instagram:{" "}
              <a
                className="text-cyan-400"
                href="https://instagram.com/lesystems"
                target="_blank"
              >
                @lesystems
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-8 py-6 text-center text-sm text-slate-500">
        © 2026 LESystems. Todos os direitos reservados.
      </footer>
    </main>
  );
}