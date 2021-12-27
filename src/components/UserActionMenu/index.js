import "./styles.css";
import editUserIcon from "../../assets/edit-user.svg";
import logoutIcon from "../../assets/logout.svg";
import triangle from "../../assets/triangle.svg";
import useAuth from "../../hooks/useAuth";

function UserActionMenu({ setShowEditUser, setShowUserActionMenu }) {
  const { setToken, removeUserData } = useAuth();

  function openEditUser(){
    setShowEditUser(true)
    setShowUserActionMenu(false)
  }
  
  return (
    <div className="userActionMenu" >
      <img className="triangle" src={triangle} alt="" />
      <div onClick={openEditUser} className="action-icon">
        
        <img
          className="editIcon"
          src={editUserIcon}
          alt=""
        />
        <span>Editar</span>
      </div>

      <div
        className="action-icon"
        onClick={() => {
          setToken(null);
          removeUserData()
        }}
      >
        <img src={logoutIcon} alt="" />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default UserActionMenu;
