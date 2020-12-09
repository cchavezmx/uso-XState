import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useMachineDispatch } from "../../context/state";

export default function Stories({ stories }) {
  const dispatch = useMachineDispatch();

  const handleStory = (story) => {
    dispatch("SELECTED_STORY", { data: story });
  };

  return (
    <Fragment>
      <Row>
        <Col className="d-flex flex-column" sm={12}>
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              onClick={() => handleStory(story)}
            >
              {story.title}
            </Link>
          ))}
        </Col>
      </Row>
    </Fragment>
  );
}
