import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Input,
  Label,
  Form,
  Alert
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useMachineDispatch, useMachineState } from "../../context/state";
import { Redirect } from "react-router-dom";

export default function Login() {
  const dispatch = useMachineDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "Carlos",
      password: "123"
    }
  });

  // accedemos al contexto de Xstate
  const machine = useMachineState();
  const { error } = machine.context;

  const onSubmit = (e) => {
    dispatch("LOGIN", { data: e });
  };

  if (machine.matches("auth.success")) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Col sm={12} xl={8} className="text-center">
          <h1>Login</h1>
        </Col>
        <Row className="justify-content-between">
          <Col sm={12} xl={8}>
            <Label>Usuario</Label>
            <Input type="text" innerRef={register} name="username" />
          </Col>
          <Col sm={12} xl={8}>
            <Label>Password</Label>
            <Input type="password" innerRef={register} name="password" />
          </Col>
          <Col sm={12} xl={8} className="mt-3 mb-3">
            <Button type="submit">Login</Button>
          </Col>
          <Col sm={12} xl={8}>
            {machine.matches("auth.fail") && (
              <Alert color="danger">{error.toString()}</Alert>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
