import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.github.com'
});


export async function searchRepositories(query: string) {
  const params = {
    q: `topic:${query}`,
    per_page: 30,
  };
  const data = await http.get('search/repositories', { params });

  return data;
}
