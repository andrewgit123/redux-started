import configureStore from "./store/configureStore";
import { assignedBugToUser, resolvingBug, loadBugs } from "./store/bugs";
import { projectAdded } from "./store/projecrs";
import { userAdded } from "./store/users";
import * as actions from "./store/api";

const store = configureStore();

store.dispatch(loadBugs());
store.dispatch(assignedBugToUser(1593062714032, 1));
store.dispatch(resolvingBug(1593062714032, true));

// setTimeout(() => store.dispatch(loadBugs()), 5000);

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "bugs",
//     onSuccess: "bugReceived",
//     onError: "apiRequestFailed",
//   },
// });

// store.dispatch({ type: "er3ror", payload: { message: "An error occured!" } });

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: "bugs/bugReceived", bugs: [1, 2, 4] });
//   console.log(getState());
// });

// store.subscribe(() => {
//   console.log("Store changed");
// });

// store.dispatch(userAdded({ name: "Andrey" }));
// // store.dispatch(userAdded({ name: "Yura" }));
// // store.dispatch(projectAdded({ name: "Project1" }));
// // store.dispatch(bugAdded({ description: "Bug1" }));
// // store.dispatch(bugAdded({ description: "Bug2" }));
// // store.dispatch(bugAdded({ description: "Bug3" }));
// // store.dispatch(bugResolved({ id: 1 }));
// // store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// // store.dispatch(bugAssignedToUser({ bugId: 2, userId: 2 }));

// let unresolved = getUnresolvedBugs(store.getState());
// let unresolved2 = getUnresolvedBugs(store.getState());

// // console.log(getAssignedBugs(store.getState())); //
// console.log(getBugByUser(1)(store.getState())); //

// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(bugAdded("Bug1"));

// // unsubscribe();

// store.dispatch(bugResolved(1));

// // console.log(store.getState());
