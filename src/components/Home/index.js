import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { useMachineState, useMachineDispatch } from "../../context/state";

import Story from "../Story";
import Stories from "../Stories";

export default function Home() {
  const dispatch = useMachineDispatch();
  const machine = useMachineState();

  useEffect(() => {
    dispatch("LOAD_STORIES");
  }, [dispatch]);

  const { stories, error, selectdStory } = machine.context;

  return (
    <Container>
      <h1>Home</h1>
      {machine.matches("list.loading") && <h2>Loading</h2>}

      {machine.matches("list.fail") && (
        <div style={{ color: "red " }}>
          Error loading stories: {error.toString()}
        </div>
      )}
      {stories?.length > 0 && <Stories stories={stories} />}
      <Switch>
        <Route path="/story/:id">
          <Story selectdStory={selectdStory} />
        </Route>
      </Switch>
    </Container>
  );
}

// ña forma en renderar la elementos depende si tenemos o no datos en nuestra maquina de contexto, podemos generar la logica dependiendo el estado en que se encuentre la maquina por eso usamos machine.matches, en el caso de la linea 29 no usamos el estado de la maquina ya que este al parecer no se renderea. y ysamos la logica de que si existe stories o y es mayor a 0
