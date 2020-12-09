import { assign, spawn } from "xstate";
import { storyMachine } from "./story";

// TODO intentearlos con axios

const storiesUrl = `https://hacker-news.firebaseio.com/v0/topstories.json`;
const getStoryDataUrl = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStories = async (context, event) => {
  const storyIds = await fetch(storiesUrl).then((res) => res.json());

  const topTenStories = await Promise.all(
    storyIds
      .slice(0, 10)
      .map((id) => getStoryDataUrl(id))
      .map((url) => fetch(url).then((res) => res.json()))
  );
  return topTenStories;
};

export const list = {
  states: {
    loading: {
      invoke: {
        id: "fetchStories",
        src: fetchStories,
        onDone: {
          target: "success",
          actions: assign({ stories: (context, event) => event.data })
        },
        onError: {
          target: "fail",
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    success: {},
    fail: {},
    selected: {
      entry: assign({
        selectdStory: () => spawn(storyMachine)
      })
    }
  }
};

// Video 39:05
// https://www.youtube.com/watch?v=g_2lt7bBwpk&t=784s
