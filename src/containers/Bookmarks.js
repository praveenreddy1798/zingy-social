import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { Container, CustomTitle, Post } from "../components";
import { loadAllBookmarks } from "../slices";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { bookmarks, bookmarksStatus } = useSelector(
    (state) => state.bookmarks
  );
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadAllBookmarks());
  }, [dispatch]);

  const bookmarkedPosts = posts.filter((post) => bookmarks.includes(post._id));

  return (
    <>
      <Container>
        <Spin spinning={bookmarksStatus === "loading"}>
          {bookmarksStatus !== "loading" &&
            (bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <CustomTitle> No Posts Available </CustomTitle>
            ))}
        </Spin>
      </Container>
    </>
  );
};

export { Bookmarks };
