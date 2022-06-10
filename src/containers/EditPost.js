import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CreateEditPost } from "../components";
import { loadPostById, clearPost } from "../slices";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(loadPostById(id));
    return () => {
      dispatch(clearPost(id));
    };
  }, [dispatch, id]);
  return <CreateEditPost type="edit" post={post} />;
};

export { EditPost };
