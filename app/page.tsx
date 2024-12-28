import Image from 'next/image'
import LandingImg from '../assets/main-illustration.png'
import Logo from '../assets/logo.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto h-24 px-4 sm:px-8 py-6 flex ">
        <Image src={Logo} width={177} height={44} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 min-h-[calc(100vh_-_6rem)] -mt-4 grid lg:grid-cols-[1fr,456px] gap-8 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="capitalize text-center lg:text-left text-4xl md:text-7xl font-bold ">
            Job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-lg mt-4 text-center lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            atque repellendus ex rerum aperiam esse, blanditiis tempore, quasi
            similique nostrum nam voluptates accusantium possimus enim. Illum
            eligendi iure porro corrupti.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImg}
          className="hidden lg:block "
          width={456}
          height={324}
          alt="Main illustration"
        />
      </section>
    </main>
  )
}
