import { assign, Machine } from "xstate";

const commentURL = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchComments = async (context, event) => {
  const { kids } = context.story;

  const comments = await Promise.all(
    kids
      .map((id) => commentURL(id))
      .map((url) => fetch(url).then((res) => res.json()))
  );
  console.log(comments);
  return comments;
};

export const storyMachine = (story) =>
  Machine({
    id: "storyMachine",
    initial: "init",
    context: {
      story,
      error: undefined,
      comments: []
    },
    states: {
      init: {},
      comments: {
        id: "comments",
        invoke: {
          id: "fetchComments",
          src: fetchComments,
          onDone: {
            target: "success",
            actions: assign({
              comments: (context, event) => event.data
            })
          },
          onError: {
            target: "fail"
          }
        }
      },
      success: {},
      fail: {}
    },
    on: {
      LOADING: {
        target: "comments"
      }
    }
  });
