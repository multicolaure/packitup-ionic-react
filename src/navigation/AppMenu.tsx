import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { useDispatch } from "react-redux";
import { logout } from "../user/user.slice";
import { menuItems } from "./menu.config";
import { useLocation } from "react-router-dom";
import styles from "./AppMenu.module.css";

const AppMenu = () => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    const location = useLocation();
    

    return (
        <IonMenu side="start" contentId="main" type="overlay">
            <IonContent>
                <IonList>
                    {menuItems.map((menuItem, index) => {
                        return (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem className={location.pathname === menuItem.url ? styles.selected : ''}
                                routerLink={menuItem.url} routerDirection="none" lines="none" detail={false}>
                            {menuItem.iosIcon && menuItem.mdIcon && <IonIcon slot="start" ios={menuItem.iosIcon} md={menuItem.mdIcon} />}
                            <IonLabel>{menuItem.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        );
                    })}
                    <IonMenuToggle key="logout" autoHide={false}>
                        <IonItem onClick={() => onLogout()} lines="none" button={true}>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default AppMenu;