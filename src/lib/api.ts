export async function api(path: string, init?: RequestInit) {
  return await fetch(`https://gestao-transportech-api.onrender.com${path}`, init)
}