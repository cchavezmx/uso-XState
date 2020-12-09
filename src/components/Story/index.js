import React, { useEffect } from "react";
import { useService } from "@xstate/react";

export default function Story({ selectdStory }) {
  // useService hook de @xstate/react para mandar el evento de loading comments
  const [current, send] = useService(selectdStory);
  const { story, comments } = current.context;

  useEffect(() => {
    send("LOADING");
  }, [send]);

  return (
    <div>
      <h3>{story.title}</h3>
      <small>{story.by}</small>
      <br />
      <div>
        {current.matches("comments") && (
          <div>
            <p>Cargando comentarios</p>
          </div>
        )}
        {comments.map((comment) => {
          return (
            <div key={comment?.id}>
              {comment?.text} by {comment?.by}
            </div>
          );
        })}
      </div>
    </div>
  );
}
