import React, { createContext, useContext } from "react";

import { useMachine } from "@xstate/react";
import { assign, Machine, spawn } from "xstate";

// Estados de la maquina
import { auth } from "./auth";
import { list } from "./list";
import { storyMachine } from "./story";

export const MachineStateContext = createContext();
export const MachineDispatchContext = createContext();

export const authMachine = Machine({
  id: "auth",
  initial: "init",
  context: {
    user: undefined,
    error: undefined,
    stories: [],
    // AQUI ASIGNAMOS LOS VALORES DE PERO DENTRO DE UNA SEGUNDA MAQUINA
    selectdStory: undefined
  },
  states: {
    init: {},
    auth,
    list,
    selected: {
      entry: assign({
        selectdStory: (context, event) => spawn(storyMachine(event.data))
      })
    }
  },
  on: {
    LOGIN: {
      target: "auth.started"
    },
    LOAD_STORIES: {
      target: "list.loading"
    },
    SELECTED_STORY: {
      target: "selected"
    }
  }
});

export const AppMachineProvider = ({ children }) => {
  const [state, dispatch] = useMachine(authMachine);

  return (
    <MachineStateContext.Provider value={state}>
      <MachineDispatchContext.Provider value={dispatch}>
        {children}
      </MachineDispatchContext.Provider>
    </MachineStateContext.Provider>
  );
};

export const useMachineState = () => useContext(MachineStateContext);
export const useMachineDispatch = () => useContext(MachineDispatchContext);

// la estructura basica, cuenta con el id de la maquina de estados, el estado inicial, el contexto de maquina, y los estados:
// Es aqui donde definimos los objectos que la maquina de estados debe cambiar.
// Machine context contiene el contexto, asi que podemos obtener los datos apartir de useMachineState
// Podemos extrer pedazos de estados del useMachine en la linea 29 sacamos el codigo de login de usuerio en un nuevo documento y lo llamamos usando las reglas de los objetos

// ESTRUCTURA BASICA DE MACHINE

// Machine({
//   id: "sstory",
//   initial: "init",
//   context: {
//     story,
//     error: undefined
//   },
//   states: {
//     init: {}
//   },
//   on: {}
// });
// };
