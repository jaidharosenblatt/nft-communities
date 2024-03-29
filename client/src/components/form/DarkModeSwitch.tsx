import { Switch } from "antd";
import { MdDarkMode } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";
import { setButtonDarkMode } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./form.css";

export default function DarkModeSwitch() {
  const darkMode = useAppSelector((state) => state.status.darkMode);
  const dispatch = useAppDispatch();
  function onChange(darkMode: boolean) {
    dispatch(setButtonDarkMode(darkMode));
  }
  return (
    <Switch
      className="dark-mode"
      checkedChildren={<MdDarkMode />}
      unCheckedChildren={<BsSunFill />}
      checked={darkMode}
      onChange={onChange}
    />
  );
}
