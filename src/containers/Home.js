import { useEffect, useState } from "react";
import { Select } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { Container, CustomTitle, Post } from "../components";
import { loadAllPosts } from "../slices";
import { getSortedPosts } from "../utils";

const CustomSelect = styled(Select)`
  && {
    margin: 0.25rem 0 0.25rem 1.5rem;
    .ant-select-selector {
      border: 1px solid var(--primary);
    }
  }
`;

const { Option } = Select;

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const { posts, postsStatus } = useSelector((state) => state.posts);
  const [sortFilter, setSortFilter] = useState("TRENDING");

  const handleChange = (value) => {
    setSortFilter(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadAllPosts());
    return () => setSearchValue("");
  }, [dispatch, setSearchValue]);

  let filteredPosts = getSortedPosts(posts, sortFilter);

  if (searchValue) {
    filteredPosts = filteredPosts.filter(
      ({ username, firstName, lastName, title, description }) =>
        username.includes(searchValue) ||
        firstName.includes(searchValue) ||
        lastName.includes(searchValue) ||
        title.includes(searchValue) ||
        description.includes(searchValue)
    );
  }

  return (
    <>
      <CustomSelect
        defaultValue="TRENDING"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="TRENDING">Trending</Option>
        <Option value="LATEST">Latest</Option>
        <Option value="OLDEST">Oldest</Option>
      </CustomSelect>
      <Container>
        <Spin spinning={postsStatus === "loading"}>
          {postsStatus !== "loading" &&
            (posts?.length > 0 ? (
              filteredPosts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <CustomTitle> No Posts Available </CustomTitle>
            ))}
        </Spin>
      </Container>
    </>
  );
};

export { Home };
