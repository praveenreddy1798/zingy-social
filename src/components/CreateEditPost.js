import React, { useEffect, useState } from "react";
import { Form, Card, Input } from "antd";
import {
  Container,
  CustomForm,
  CustomInput,
  CustomButton,
  CustomTitle,
} from "../components";
import { useDispatch } from "react-redux";
import { createPost, editPost } from "../slices";
import { useNavigate } from "react-router";
import { CustomUpload } from "./Utils";

const { TextArea } = Input;

const CreateEditPost = ({ type, post = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fileList: [],
    isChanged: false,
  });
  const [form] = Form.useForm();
  const { _id, title, description, photo } = post;
  const props = {
    onRemove: () => {
      setSelectedFile({ file: null, fileList: [], isChanged: true });
    },
    beforeUpload: (file) => {
      setSelectedFile({
        file,
        fileList: [file],
        isChanged: true,
      });
      return false;
    },
    fileList: selectedFile.fileList,
  };

  useEffect(() => {
    if (type === "edit") {
      const urlToFile = async (photoUrl) =>
        await fetch(photoUrl)
          .then((res) => res.blob()) // Gets the response and returns it as a blob
          .then((blob) => new File([blob], "image"));
      (async () => {
        form.setFieldsValue({
          title,
          description,
        });
        if (photo) {
          const photoFile = await urlToFile(photo);
          setSelectedFile({
            file: photoFile,
            fileList: [photoFile],
            isChanged: false,
          });
        }
      })();
    }
  }, [description, form, photo, title, type, dispatch, _id]);
  const onFinish = async (e) => {
    e.preventDefault();
    await form.validateFields();
    const values = form.getFieldsValue();
    let formData = new FormData();
    let response;
    if (!selectedFile.file && type === "edit" && selectedFile.isChanged) {
      formData.append("isPicRemoved", true);
    }
    if (selectedFile.file) {
      if ((type === "edit" && selectedFile.isChanged) || type === "create") {
        formData.append("file", selectedFile.file);
      }
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }
    if (type === "create") {
      response = await dispatch(createPost(formData));
    } else {
      response = await dispatch(editPost({ postId: _id, payload: formData }));
    }
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <Container height="90vh">
      <Card
        title={
          <Container>
            <CustomTitle level={3}>
              {type === "create" ? "Create Post" : "Edit Post"}
            </CustomTitle>
          </Container>
        }
      >
        <CustomForm
          form={form}
          onSubmit={onFinish}
          name="basic"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            label={type === "create" ? "Add Picture" : "Change Picture"}
            name="picture"
          >
            <CustomUpload {...props}>
              <CustomButton>Choose Picture</CustomButton>
            </CustomUpload>
          </Form.Item>

          <Form.Item>
            <CustomButton onClick={onFinish} type="primary" htmlType="submit">
              {type === "create" ? "Create Post" : "Edit Post"}
            </CustomButton>
          </Form.Item>
        </CustomForm>
      </Card>
    </Container>
  );
};

export { CreateEditPost };
