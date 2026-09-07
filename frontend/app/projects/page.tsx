import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsIntro from "@/components/projects/ProjectsIntro";

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />

      <div>
        <ProjectsGrid />
      </div>

      <ProjectsIntro />
    </main>
  );
}