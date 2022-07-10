const request = async (
  url,
  method = "GET",
  body = null,
  headers = {},
  files = false,
  getFileName = false
) => {
  if (body && !files) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, { method, body, headers });

  if (getFileName) {
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = getFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Что то пошло не так");
      }

      return data;
    }
  } else {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Что то пошло не так");
    }

    return data;
  }
};

export const authAPI = {
  login(form) {
    return request("/api/user/login", "POST", form);
  },

  auth(token) {
    return request("/api/user/me", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
  },

  register(form) {
    return request(`/api/user/register`, "POST", form, {}, true);
  },
};

export const userAPI = {
  all(params, token) {
    return request("/api/users", "POST", params, {
      Authorization: `Bearer ${token}`,
    });
  },

  changePhoto(form, token) {
    return request(
      `/api/photo`,
      "PUT",
      form,
      {
        Authorization: `Bearer ${token}`,
      },
      true
    );
  },
  change(form, token) {
    return request(`/api/user`, "PUT", form, {
      Authorization: `Bearer ${token}`,
    });
  },
};
