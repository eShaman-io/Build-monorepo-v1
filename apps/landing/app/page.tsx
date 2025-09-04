import Hero from "./(components)/Hero"
import WhatYoullFeel from "./(components)/WhatYoullFeel"
import OracleDemo from "./(components)/OracleDemo"
import RitualsAndCycles from "./(components)/RitualsAndCycles"
import FounderNote from "./(components)/FounderNote"
import FAQ from "./(components)/FAQ"
import Footer from "./(components)/Footer"

export default function Page() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <WhatYoullFeel />
      <OracleDemo />
      <RitualsAndCycles />
      <FounderNote />
      <FAQ />
      <Footer />
    </main>
  )
}
