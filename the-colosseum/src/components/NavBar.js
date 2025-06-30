import {Logo} from "./Logo";
import {Menu} from "./Menu";
import {UserAuth} from "./UserAuth";

export const NavBar = () => {
    return(
        <div className="nav-bar">
            <Logo />
            <Menu />
            <UserAuth />
        </div>
    )
}
