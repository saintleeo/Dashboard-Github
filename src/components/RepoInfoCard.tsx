import type { Repository } from "../types/repository";

type Props = {
  repo: Repository;
};

export default function RepoInfoCard({ repo }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
      <h2>{repo.full_name}</h2>
      <p>{repo.description}</p>

      <a href={repo.html_url} target="_blank">
        Ver no GitHub
      </a>
    </div>
  );
}
