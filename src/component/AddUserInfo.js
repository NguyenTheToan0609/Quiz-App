import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//     state = {
//         name : '',
//         address : 'Ha Noi',
//         age : ''
//     }

//     handleOnchangeInput = (event) => {
//         this.setState({
//             name : event.target.value,
//         })
//     }

//     handleOnchangeAge = (event) => {
//         this.setState({
//             age : event.target.value,
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         this.props.addNewUser({
//             id : Math.floor(Math.random() * 1000 ),
//             name : this.state.name,
//             age : this.state.age
//         })
//         this.setState({
//             name : '',
//             age : ''
//         })
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and my age {this.state.age}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name:</label>
//                     <input
//                     value={this.state.name}
//                     type="text"
//                     onChange = {(event) => this.handleOnchangeInput(event)}/>
//                     <label>Your Age:</label>
//                     <input
//                     value={this.state.age}
//                     type="text"
//                     onChange = {(event) => this.handleOnchangeAge(event)}/>
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfo = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("Ha Noi");
  const [age, setAge] = useState("");

  const handleOnchangeInput = (event) => {
    setName(event.target.value);
  };

  const handleOnchangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.addNewUser({
      id: Math.floor(Math.random() * 1000),
      name: name,
      age: age,
    });
    setName("");
    setAge("");
  };

  return (
    <div>
      My name is {name} and my age {age}
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your name:</label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnchangeInput(event)}
        />
        <label>Your Age:</label>
        <input
          value={age}
          type="text"
          onChange={(event) => handleOnchangeAge(event)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfo;
