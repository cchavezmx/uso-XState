import { assign } from "xstate";

const doLogin = async (context, event) => {
  const { username, password } = event.data;
  if (username !== "Carlos" && password !== "123") {
    throw new Error("Authenticate Error");
  }
  localStorage.setItem("token", username);
  return { username, password };
};

export const auth = {
  states: {
    started: {
      invoke: {
        id: "doLogin",
        src: doLogin,
        onDone: {
          target: "success",
          actions: assign({ user: (context, event) => event.data })
        },
        onError: {
          target: "fail",
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    success: {},
    fail: {}
  }
};
