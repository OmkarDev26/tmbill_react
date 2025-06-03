import api from "./index";

export async function login(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function signup(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/signup", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function checkUser(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/checkUser", payload);
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function logout(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/logout", payload);
      if (data) {
        if (data?.code == 200) {
          localStorage.clear();
        }
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function resetLink(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/resetLink", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function authenticate(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/authenticate", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function change_password(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/auth/change_password", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
