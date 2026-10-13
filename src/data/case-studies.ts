type CaseStudy = {
  challenge: string;
  scope: string[];
  considerations: { title: string; text: string }[];
  outcome: string;
};

// Public-interface observations and owner-confirmed contributions. These do not
// attribute interface implementation, design decisions, or business metrics.
export const caseStudies: Partial<Record<string, CaseStudy>> = {
  "movie-af": {
    challenge: "Movie.af presents a large collection of movies and series to Persian-speaking viewers in Afghanistan. Its public interface brings together featured titles, browsing categories, artwork, and title information, all of which depend on the backend keeping the catalogue and viewer data consistent.",
    scope: ["Catalogue", "Viewer features", "APIs", "Playback statistics"],
    considerations: [
      { title: "A catalogue that stays in sync", text: "Backend work on movies, series, seasons, and episodes, with localized names and descriptions, and catalogue data kept in sync with external movie databases." },
      { title: "Features tied to the viewer", text: "Profiles, preferences, watch history, comments, reviews, and reporting, each connected to a viewer’s account." },
      { title: "Services and APIs", text: "The backend is a set of NestJS services. I work on the endpoints that expose these features to the apps, and on playback statistics." },
    ],
    outcome: "I have contributed to the Movie.af backend since 2025. The public website is the work of the frontend team.",
  },
};