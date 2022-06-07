import React, { useState } from "react";
import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout } from "antd";
import {
  Explore,
  Home,
  Login,
  Signup,
  NotFound,
  // CreatePost,
  // Bookmarks,
  // EditPost,
  // EditProfile,
  // PostDetail,
  // Profile,
} from "./containers";
import { PrivateRoute, RestrictedRoute, Header, Sider } from "./components";
const { Content } = Layout;

const ContentSection = styled(Content)`
  margin-top: 5rem;
  width: 100%;
  min-height: 100vh;
  max-height: max-content;
  @media only screen and (max-width: 1000px) {
    margin-top: 7rem;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 8rem;
  }
`;

function App() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const hideSider =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className="App">
      <Layout>
        <Header
          pathname={location.pathname}
          setSearch={setSearchValue}
          search={searchValue}
        />
        <Layout
          className="site-layout"
          style={{
            marginLeft: hideSider ? "0" : isCollapsed ? "5rem" : "18rem",
          }}
        >
          <Sider hideSider={hideSider} setIsCollapsed={setIsCollapsed} />

          <ContentSection>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                }
              />
              <Route
                exact
                path="/explore"
                element={
                  <Explore
                    width="100%"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                }
              />
              {/* <Route exact path="/posts/:postId" element={<PostDetail />} />
              <Route exact path="/profile/:username" element={<Profile />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/post/create" element={<CreatePost />} />
                <Route exact path="/post/edit/:id" element={<EditPost />} />
                <Route exact path="/profile/edit" element={<EditProfile />} />
                <Route exact path="/bookmarks" element={<Bookmarks />} />
              </Route> */}
              <Route element={<RestrictedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ContentSection>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
