const api_url=function(){
  let api_url = process.env.API_URL || 'http://localhost:8080';
  return api_url;
}

export const API_URL = api_url();