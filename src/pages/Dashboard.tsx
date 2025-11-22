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
        setCommits([0, 0, 0, 0]); // fallback simples
      }
      
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  // Carregar repo mais popular ao iniciar
  useEffect(() => {
    loadRepository("stars:>1");
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <SearchBar onSearch={loadRepository} />

      {loading && <p>Carregando...</p>}

      {repo && (
        <>
          <RepoInfoCard repo={repo} />

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <StatsCard label="Stars" value={repo.stargazers_count} />
            <StatsCard label="Forks" value={repo.forks_count} />
            <StatsCard label="Watchers" value={repo.watchers_count} />
          </div>

          {commits && <CommitsChart data={commits} />}
          {languages && <LanguagesChart data={languages} />}
        </>
      )}
    </div>
  );
}
