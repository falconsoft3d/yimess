import { authFetch } from "../utils/fetch";

export async function getProvider(idUser) {
    try {
      const url = `${process.env.URL_SERVER}/api/providers/byuser/${idUser}`;
      const response = await authFetch(url);
      const result = await response;
      return result;
    } catch (error) {
        console.log(error);
      return null;
    }
  }


export async function deleteProvider(id) {
    try {
      const provider = `${process.env.URL_SERVER}/api/providers/${id}`;
      const response = await authFetch(provider,{
        method: 'DELETE',
      });
      const result = await response.json();
      return result.data;
    } catch (error) {
        console.log(error);
      return null;
    }
  }
  
  
  export async function addProvider(formData) {
    try {
      const url = `${process.env.URL_SERVER}/api/providers/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await authFetch(url, params);
      const result = await response;
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }