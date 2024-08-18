import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

// class DisplayInfo extends React.Component {

//     state = {
//         isShowListUser : true
//     }

//     hanldeShowHide = () => {
//         this.setState({
//             isShowListUser : !this.state.isShowListUser
//         })
//     }

//     render(){
//         const {listUsers} = this.props
//         return (
//             <div className="list-infor-user">
//                 <div>
//                     {true &&

//                         listUsers.map((item) => {
//                             return(

//                                 <div key={item.id} className={+item.age > 18 ? "green" : "red"} >

//                                     <hr/>
//                                     <div>My name's: {item.name} </div>
//                                     <div>age: {item.age} </div>

//                                     <div>
//                                     <button onClick={() => this.props.handleDeleteUser(item.id)}>Delete</button>
//                                     </div>

//                                 </div>

//                             )
//                         })

//                     }
//                 </div>
//             </div>

//         )
//     }
// }

const DisplayInfo = (props) => {
  const { listUsers } = props;
  const [isShowListUser, setShowListuser] = useState(true);
  const hanldeShowHide = () => {
    setShowListuser(!isShowListUser);
  };

  useEffect(() => {
    if (listUsers.length === 0) {
      alert("abcd");
    }
  }, [listUsers]);
  return (
    <div className="list-infor-user">
      <div>
        <span onClick={() => hanldeShowHide()}>
          {isShowListUser === true ? "Hide list users" : "Show list users"}
        </span>
      </div>
      <div>
        {isShowListUser &&
          listUsers.map((item) => {
            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <hr />
                <div>My name's: {item.name} </div>
                <div>age: {item.age} </div>

                <div>
                  <button onClick={() => props.handleDeleteUser(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayInfo;
