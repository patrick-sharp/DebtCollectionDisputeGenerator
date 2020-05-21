import React from "react";
import cx from "classnames";
import { Divider } from "@blueprintjs/core";

export default function RightBar({ children }: { children: React.ReactNode }) {
  return (
    <div className={cx("blog", "right-bar")}>
      <Divider />
      {children}
    </div>
  );
}
