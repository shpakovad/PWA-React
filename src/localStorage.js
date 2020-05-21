// // export const loadState = () => {
// //     try {
// //         const serializedState = localStorage.getItem('state');
// //         if (serializedState === null) {
// //             return undefined;
// //         }
// //         return JSON.parse(serializedState);
// //     } catch (error) {
// //         return undefined;
// //     }
// // };
// let nextId = 1
// export const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState !== null) {
//             return JSON.parse(serializedState);
//         }
//         this.setState(serializedState,() =>{
//             serializedState.forEach(t => {
//                 if (t.id >= nextId) {
//                     nextId = t.id + 1;
//                 }
//             })
//         })
//     } catch (error) {
//         return undefined;
//     }
// };
//
// export const saveState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (error) {
//         console.log(error);
//     }
// };
