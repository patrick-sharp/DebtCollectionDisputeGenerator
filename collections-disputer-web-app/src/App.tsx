import { CSSReset, Flex, Spinner, theme, ThemeProvider } from "@chakra-ui/core";
import { Link, Router } from "@reach/router";
import cx from "classnames";
import React from "react";
import { addPrefetchExcludes, Root, Routes } from "react-static";
import "./app.css";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Flex p={5} borderBottom={"1px solid"} borderColor={"gray.200"}>
          <Link to="/" className={cx("bp3-button")} role="button" tabIndex={0}>
            Home
          </Link>
        </Flex>
        <div className="content">
          <React.Suspense
            fallback={
              <Flex w={"full"} h={"full"}>
                <Spinner />
              </Flex>
            }
          >
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
      </ThemeProvider>
    </Root>
  );
}

export default App;

const customTheme = {
  ...theme,
};
