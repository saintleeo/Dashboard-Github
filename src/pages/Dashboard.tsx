import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RepoInfoCard from "../components/RepoInfoCard";
import StatsCard from "../components/StatsCard";
import CommitsChart from "../components/CommitsChart";
import LanguagesChart from "../components/LanguagesChart";

import {
  searchTopRepo,
  getRepoLanguages,
  getRepoParticipation,
} from "../services/github";

import type { Repository } from "../types/repository";

export default function Dashboard() {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [languages, setLanguages] = useState<Record<string, number> | null>(null);
  const [commits, setCommits] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRepository(query: string) {
    setLoading(true);

    try {
      const found = await searchTopRepo(query);

      if (!found) return;

      setRepo(found);

      const langs = await getRepoLanguages(found.owner.login, found.name);
      setLanguages(langs);

      const participation = await getRepoParticipation(
        found.owner.login,
        found.name
      );

      if (
        participation &&
        participation.all &&
        Array.isArray(participation.all) &&
        participation.all.length >= 4
      ) {
        setCommits(participation.all.slice(-4));
      } else {
        setCommits([0, 0, 0, 0]);
      }

    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRepository("stars:>1");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <SearchBar onSearch={loadRepository} />

      {loading && <p style={{ color: "#c9d1d9" }}>Carregando...</p>}

      {repo && (
        <>
          <RepoInfoCard repo={repo} />

          <div 
            style={{ 
              display: "flex", 
              gap: 20, 
              width: "100%", 
              marginTop: 20, 
              marginBottom: 20,
              flexWrap: "wrap"
            }}
          >
            <StatsCard label="Stars" value={repo.stargazers_count} />
            <StatsCard label="Forks" value={repo.forks_count} />
            <StatsCard label="Watchers" value={repo.watchers_count} />
          </div>

          <div 
            style={{ 
                display: "flex", 
                gap: 20, 
                width: "100%", 
                flexWrap: "wrap"
            }}
          >
            {commits && (
                <CommitsChart 
                    data={commits} 
                    style={{ flex: 1, minWidth: "350px" }}
                />
            )}
            {languages && (
                <LanguagesChart 
                    data={languages} 
                    style={{ flex: 1, minWidth: "350px" }} 
                />
            )}
          </div>
        </>
      )}
    </div>
  );
}