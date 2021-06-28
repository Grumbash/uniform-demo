import React from "react";
import { UniformTracker } from "@uniformdev/optimize-tracker-react";
import localTracker from "./tracker";
import TestRender from "./components/TestRender";

function App() {
  return (
    <div>
      <UniformTracker trackerInstance={localTracker}>
        <TestRender />
      </UniformTracker>
    </div>
  );
}

export default App;
