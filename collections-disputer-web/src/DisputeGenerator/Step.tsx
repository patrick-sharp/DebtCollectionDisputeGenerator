import React from "react";

export default function Step({ children }: { children: string | React.ReactChildren }) {
  return <div className="step">{children}</div>;
}
