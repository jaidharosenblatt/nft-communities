import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import "./Footer.css";

type Props = { onClick: () => void; showFilter: boolean };
export default function Footer({ onClick, showFilter }: Props) {
  return (
    <div onClick={onClick} className="mobile-footer">
      {showFilter ? <IoCloseOutline /> : <BiSearch />}
      <h2>{showFilter ? "Close" : "Customize Search"}</h2>
    </div>
  );
}
