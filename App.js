import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/task/View";
import Edit from "./components/task/Edit";
// import List from "./components/student/list";
function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/view/:id" component={View} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
