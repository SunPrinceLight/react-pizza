import React from "react";

import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import {Link} from "react-router-dom";
const NotFound:React.FC = () => {
  return(
      <div className="cart cart--empty">
        <NotFoundBlock />
        <Link to="/" className="button button--black">
          <span>На главную</span>
        </Link>

      </div>
  );
}
export default NotFound;