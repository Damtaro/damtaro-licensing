import AcademyNavbar from "./components/AcademyNavbar.jsx";
import AcademyHero from "./components/AcademyHero.jsx";
import AcademyPrograms from "./components/AcademyPrograms.jsx";
import AcademyFAQ from "./components/AcademyFAQ.jsx";
import AcademyCTA from "./components/AcademyCTA.jsx";
import AcademyFooter from "./components/AcademyFooter.jsx";

export default function AcademyApp() {
  return (
    <div className="academy-shell min-h-screen overflow-hidden bg-[#090909] text-white">
      <AcademyNavbar />
      <main>
        <AcademyHero />
        <AcademyPrograms />
        <AcademyFAQ />
        <AcademyCTA />
      </main>
      <AcademyFooter />
    </div>
  );
}
