import SignIn from "./component/SignIn"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./component/HomePage";
import PageNotFound from "./component/PageNotFound";
import AuthDetails  from "./component/AuthDetails";
import Signup from "./component/Signup";
import UserPage from "./component/UserPage";
import { PrivateRoute } from "./component/PrivateRoute";
import About from "./component/About";



export default function App() {
  return (
  <AuthDetails>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route exact path="signin" element={<SignIn />} />
          {/* <Route exact path="about" element={<About />} /> */}
          <Route exact path="userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </AuthDetails>
    
  );
}