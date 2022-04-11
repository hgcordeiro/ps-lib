import React from "react";

import GlobalStyle from './styles/global';
import Library from "./pages/Library";

const App: React.FC = () => (
  <>
    <Library />
    <GlobalStyle />
  </>
);

export default App;
