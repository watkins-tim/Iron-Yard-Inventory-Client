const api_url=function(){
  let api_url = process.env.API_URL || 'http://localhost:8080';
  console.log(process.env.API_URL);
  return api_url;
}

export const {API_URL} = api_url();