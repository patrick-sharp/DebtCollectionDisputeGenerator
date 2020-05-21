import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Link, Router } from "@reach/router";
import { Navbar, Classes } from "@blueprintjs/core";
import FancyDiv from "@components/FancyDiv";
import cx from "classnames";
import "./app.css";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <Navbar>
        <Navbar.Group>
          <Link
            to="/"
            className={cx("bp3-button", Classes.MINIMAL)}
            role="button"
            tabIndex={0}
          >
            Home
          </Link>
        </Navbar.Group>
      </Navbar>
      <div className="content">
        <FancyDiv>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </FancyDiv>
      </div>
    </Root>
  );
}

export default App;
