import type { Repository } from "../types/repository";

interface RepoInfoCardProps {
  repo: Repository;
}

export default function RepoInfoCard({ repo }: RepoInfoCardProps) {
  return (
    <div style={styles.container}>
      <img 
        src={repo.owner.avatar_url} 
        alt={`Avatar de ${repo.owner.login}`} 
        style={styles.avatar} 
      />
      
      <div style={styles.infoContainer}>
        <div style={styles.header}>
          <h2 style={styles.name}>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.link}
            >
              {repo.full_name}
            </a>
          </h2>
          <span style={styles.badgePrivate}>
            {repo.private ? "Private" : "Public"}
          </span>
        </div>

        <p style={styles.description}>
          {repo.description || "Sem descrição disponível para este repositório."}
        </p>

        <div style={styles.meta}>
           <span style={styles.metaItem}>By <strong>{repo.owner.login}</strong></span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: "24px",
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "24px",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    flexWrap: "wrap" as const,
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "2px solid #30363d",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    flex: 1,
    minWidth: '200px',
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
    flexWrap: "wrap" as const,
  },
  name: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
  },
  link: {
    color: "#58a6ff",
    textDecoration: "none",
  },
  badgePrivate: {
    border: "1px solid #30363d",
    borderRadius: "2em",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#8b949e",
  },
  description: {
    color: "#c9d1d9",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "0 0 16px 0",
  },
  meta: {
      fontSize: "14px",
      color: "#8b949e",
  },
  metaItem: {
      marginRight: "16px",
  }
};