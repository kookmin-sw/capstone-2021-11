export const tokenConfig = () => {
  const token = window.sessionStorage.getItem("token");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `JWT ${token}`;
  }
  // const config = `Authorization:Token ${token}`;
  console.log("token:", config);
  return config;
};
