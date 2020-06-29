import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignedToUser: (bugs, action) => {
      const { id, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === id);
      bugs.list[index].userId = userId;
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugReceived,
  bugRequested,
  bugRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "bugs";
// Action creators
export const loadBugs = () => (dispatch, getStore) => {
  const { lastFetch } = getStore().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugRequested.type,
      onError: bugRequestFailed.type,
      onSuccess: bugReceived.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const assignedBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

export const resolvingBug = (bugId, resolved) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { resolved },
    onSuccess: bugResolved.type,
  });

// export const getAssignedBugs = (state) => {
//   return state.entities.bugs.filter((bug) => bug.userId !== null);
// };

export const getAssignedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.userId !== null)
);

export const getBugByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => bug.resolved != true)
);
