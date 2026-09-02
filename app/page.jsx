import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Exeperience from "./components/Exeperience";
import Project from "./components/Project";
import Certification from "./components/Certification";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero/>
      <About/>
      <Skills/>
      <Exeperience/>
      <Project/>
      <Certification/>
      <Contact/>
      <Footer/>

      <section
        id="home"
        className="flex min-h-screen items-center justify-center"
      >
        <h1 className="text-5xl font-bold">
          My Portfolio
        </h1>
      </section>
    </main>
  );
}