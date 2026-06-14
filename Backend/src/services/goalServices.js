import API from "./api";

export const getGoals =
  async () => {
    const response =
      await API.get("/goals");

    return response.data;
  };

export const createGoal =
  async (data) => {
    const response =
      await API.post(
        "/goals",
        data
      );

    return response.data;
  };

export const deleteGoal =
  async (id) => {
    const response =
      await API.delete(
        `/goals/${id}`
      );

    return response.data;
  };

export const updateGoal =
  async (
    id,
    data
  ) => {
    const response =
      await API.put(
        `/goals/${id}`,
        data
      );

    return response.data;
  };