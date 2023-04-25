import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <Link to='/' className='link'>
              <li className='sidebarListItem'>
                <LineStyleIcon className='sidebarIcon' />
                Home
              </li>
            </Link>
            <Link to='/companies' className='link'>
              <li className='sidebarListItem'>
                <FormatListBulletedIcon className='sidebarIcon' />
                Companies
              </li>
            </Link>
            <Link to='/products' className='link'>
              <li className='sidebarListItem'>
                <FormatListBulletedIcon className='sidebarIcon' />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
