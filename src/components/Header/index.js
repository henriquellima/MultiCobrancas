import "./styles.css"
import arrowDown from "../../assets/arrow-down.svg";
import LetterAvatars from "../../components/LetterAvatars";
import UserActionMenu from "../../components/UserActionMenu";
import { useState } from "react";
import ModalConfirmEdit from "../../components/ModalConfirmEdit";
import ModalUserEdit from "../../components/ModalUserEdit";
import useAuth from "../../hooks/useAuth";

function Header (props) {
    const [showUserActionMenu, setShowUserActionMenu] = useState(false);
    const { userData, loading } = useAuth();
    const [showEditUser, setShowEditUser] = useState(false);
  
    const [showEditConfirm, setShowEditConfirm] = useState(false);
  
    function closeEditModal() {
        setShowEditUser(!showEditUser);
      }
      function closeConfirmModal() {
        setShowEditConfirm(!showEditConfirm);  
      }

    return(
        <header className="header-home"  onMouseLeave={() => setShowUserActionMenu(false)}>
             {!loading && showEditUser && (
        <ModalUserEdit closeModal={closeEditModal} userData={userData} setShowEditUser={setShowEditUser}  setShowEditConfirm={setShowEditConfirm} />
      )}
      {showEditConfirm && <ModalConfirmEdit closeModal={closeConfirmModal} />}
        <h1 className={`${window.location.pathname==="/home" && "title-home"}`}>{props.title}</h1>
        <div className="user-nav" onClick={() => setShowUserActionMenu(!showUserActionMenu)}>
          
          <LetterAvatars first={userData.name[0]}/>
          <h2 className="">{userData.name}</h2>

          <img
            className="arrowDown"
            src={arrowDown}
            alt=""
          />
          {showUserActionMenu && (
            <UserActionMenu
              setShowEditUser={setShowEditUser}
              setShowUserActionMenu={setShowUserActionMenu}
              
            />
          )}
        </div>
      </header>
    );
}

export default Header;