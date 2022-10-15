import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ history, children }) => {
    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      };
    }, [history]);
  
    return <>{children}</>;
};
  
const ScrollToTopWithRouter = withRouter(ScrollToTop);

export default ScrollToTopWithRouter;