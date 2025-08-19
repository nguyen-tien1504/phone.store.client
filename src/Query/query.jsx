import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useCategories = () => {
  return useQuery("categories", async () => {
    const response = await axios.get("http://localhost:3000/categories");
    return response.data.categories;
  });
};

export const useProducts = (categoryName) => {
  return useQuery(["products", categoryName], async () => {
    if (categoryName === "Tất cả") {
      const response = await axios.get("http://localhost:3000/products");
      return response.data.product;
    }
    const response = await axios.get(
      `http://localhost:3000/products?brand=${categoryName}`
    );
    return response.data.product;
  });
};

export const createCategory = async (categoryData) => {
  const response = await axios.post("http://localhost:3000/categories", categoryData);
  return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await axios.put(
    `http://localhost:3000/categories/${categoryId}`,
    categoryData
  );
  return response.data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId) => {
      const response = await axios.delete(
        `http://localhost:3000/categories/${categoryId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export const useUserById = (userId) => {
  return useQuery(["user", userId], async () => {
    const res = await axios.get(`http://localhost:3000/users/${userId}`);
    return res.data;
  });
};
export const useUserCartById = (userId) => {
  return useQuery(["userCart", userId], async () => {
    const res = await axios.get(`http://localhost:3000/users/${userId}?cart=true`);
    return res.data;
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, userData }) => {
      const response = await axios.put(
        `http://localhost:3000/users/updateUser/${userId}`,
        userData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export const useAllUserCart = (userId) => {
  return useQuery(
    ["allUserCart", "userCart", userId],
    async () => {
      if (userId) {
        const response = await axios.get(`http://localhost:3000/users?cart=${userId}`);
        return response.data.user;
      }

      const response = await axios.get("http://localhost:3000/users?cart=all");
      return response.data.users;
    },
  );
};


export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, status }) => {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}?status=${status}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allUserCart");
    },
  });
}