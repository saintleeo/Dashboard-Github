export type RepoOwner = {
    login: string;
    avatar_url: string;
    html_url: string;
};

export type Repository = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    owner: RepoOwner;
    language?: string;
    private: boolean;
};