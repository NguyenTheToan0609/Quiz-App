import React, { useReducer, useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

// class MyComponent extends React.Component {

//     state = {
//         listUsers:[
//             {id : 1 , name : 'Alice' , age : '16'},
//             {id : 2 , name : 'Bob' , age : '20'},
//             {id : 3 , name : 'Starker' , age : '26'},
//         ]
//     }

//     addNewUser = (user) => {
//         this.setState({
//             listUsers : [user,...this.state.listUsers]
//         })
//     }

//     handleDeleteUser = (user) => {
//         let listUsersClone = [...this.state.listUsers]
//         listUsersClone = listUsersClone.filter((item) => item.id !== user)
//         this.setState({
//             listUsers : listUsersClone
//         })
//     }

//     render() {
//         return(
//             <div>
//                 <AddUserInfo
//                     addNewUser = {this.addNewUser}
//                 />
//                 <br></br>
//                 <DisplayInfo
//                     listUsers = {this.state.listUsers}
//                     handleDeleteUser = {this.handleDeleteUser}
//                 />
//             </div>
//         )
//     }
// }

const MyComponent = (props) => {
  const [listUsers, setlistUsers] = useState([
    { id: 1, name: "Alice", age: "16" },
    { id: 2, name: "Bob", age: "20" },
    { id: 3, name: "Starker", age: "26" },
  ]);

  const addNewUser = (user) => {
    setlistUsers([user, ...listUsers]);
  };

  //   handleDeleteUser = (user) => {
  //     let listUsersClone = [...this.state.listUsers];
  //     listUsersClone = listUsersClone.filter((item) => item.id !== user);
  //     this.setState({
  //       listUsers: listUsersClone,
  //     });
  //   };

  const handleDeleteUser = (user) => {
    let listUsersClone = listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== user);
    setlistUsers(listUsersClone);
  };

  return (
    <div>
      <AddUserInfo addNewUser={addNewUser} />
      <br></br>
      <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default MyComponent;
