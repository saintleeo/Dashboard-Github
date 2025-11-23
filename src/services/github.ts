
const BASE = "https://api.github.com";

export async function searchTopRepo(query: string) {
    const q = encodeURIComponent(query);
    const url = `${BASE}/search/repositories?q=${q}&sort=stars&order=desc&per_page=1`;
  
    console.log("URL da busca:", url);
  
    const res = await fetch(url);
  
    console.log("Status da busca:", res.status);
  
    if (!res.ok) {
      const msg = await res.text();
      console.error("Erro na busca:", msg);
      throw new Error("Erro na busca de repositórios");
    }
  
    const data = await res.json();
    console.log("Resultado da busca:", data);
  
    if (data.items && data.items.length > 0) {
        return data.items[0];
      } else {
        return null;
      }
}  

export async function getRepoLanguages(owner: string, repo: string) {
    const url = `${BASE}/repos/${owner}/${repo}/languages`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar linguagens");

    return res.json();
}

export async function getRepoParticipation(owner: string, repo: string) {
    const url = `${BASE}/repos/${owner}/${repo}/stats/participation`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar commits");
  
    return res.json();
  }