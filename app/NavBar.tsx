import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";

const NavBar = () => {
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 justify-between items-center">
            <Link href="/">
                <IoFastFoodOutline />
            </Link>
            <ul className="flex space-x-6 items-end">
                <li>
                    <Link href="#">Sign In</Link>{" "}
                </li>
                <li>
                    <Link href="#">Sign Up</Link>{" "}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
