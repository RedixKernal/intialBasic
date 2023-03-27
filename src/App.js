import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Postformdata from "./pages/postFormData";
import Getformdata from "./pages/getFormData";
import Searchdata from "./pages/searchData";
import Header from "./pages/header";
import { Provider } from "react-redux";
import  store  from "./redux/store";
import Tabledata from "./pages/tableData";
import Resuablemeta from "./helpers/ResuableMeta";

function App() {
  return (
    <>
   
      {/* <MetaTags>
      <meta property="og:title" content="employeeData"/>
      <meta property="og:site_name" content="Blog - data"/>
      <meta property="og:url" content="http://192.168.56.1:3000/"/>
      <meta property="og:description" content="data set added og type file"/>
      <meta property="og:type" content="profile"/>
      <meta property="og:image" content="https://img.icons8.com/fluency/50/000000/apple-mail.png"/>
      </MetaTags> */}
    <Router>
       <Header/>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Searchdata}/>
          <Route path="/get" component={Getformdata}/>
          <Route path="/post" component={Postformdata}/>
          <Route path="/form" component={Tabledata}/>
        </Switch>
      </Provider>
    </Router>
  </>
   
  );
}

export default App;
