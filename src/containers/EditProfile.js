import { Form, Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Container,
  CustomForm,
  CustomInput,
  CustomButton,
  CustomTitle,
  CustomUpload,
} from "../components/Utils";
import { profileFormDetails } from "../form-data/profile";
import { editUserInfo, loadUserInfoByUsername } from "../slices";

const EditProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    auth: {
      userDetails: { username },
    },
    user: { userInfo },
  } = useSelector((state) => state);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fileList: [],
    isChanged: false,
  });
  const { firstName, lastName, bio, portfolio, profilePic } = userInfo;
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

  useEffect(() => {}, [username, dispatch]);

  useEffect(() => {
    dispatch(loadUserInfoByUsername(username));
    const urlToFile = async (photoUrl) =>
      await fetch(photoUrl)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => new File([blob], "image"));
    (async () => {
      form.setFieldsValue({
        firstName,
        lastName,
        bio,
        portfolio,
        profilePic,
      });
      if (profilePic) {
        const photoFile = await urlToFile(profilePic);
        setSelectedFile({
          file: photoFile,
          fileList: [photoFile],
          isChanged: false,
        });
      }
    })();
  }, [form, dispatch, username, firstName, lastName, bio, portfolio, profilePic]);
  const onFinish = async (e) => {
    e.preventDefault();
    await form.validateFields();
    const values = form.getFieldsValue();
    let formData = new FormData();
    if (!selectedFile.file && selectedFile.isChanged) {
      formData.append("isPicRemoved", true);
    }
    if (selectedFile.file && selectedFile.isChanged) {
      formData.append("file", selectedFile.file);
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }
    const response = await dispatch(editUserInfo(formData));
    if (!response.error) {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <Container height="100vh">
      <Card
        title={
          <Container>
            <CustomTitle level={3}>Edit Profile</CustomTitle>
          </Container>
        }
      >
        <CustomForm
          form={form}
          name="basic"
          onSubmit={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {profileFormDetails.map(
            ({ label, name, rules, type, accept }, index) => {
              if (type === "file") {
                return (
                  <Form.Item label="Profile pic" name="picture">
                    <CustomUpload {...props}>
                      <CustomButton>Choose Picture</CustomButton>
                    </CustomUpload>
                  </Form.Item>
                );
              } else {
                return (
                  <Form.Item
                    key={index}
                    label={label}
                    name={name}
                    rules={rules}
                  >
                    <CustomInput type={type} accept={accept} />
                  </Form.Item>
                );
              }
            }
          )}
          <Form.Item>
            <CustomButton onClick={onFinish} type="primary" htmlType="submit">
              Edit Profile
            </CustomButton>
          </Form.Item>
        </CustomForm>
      </Card>
    </Container>
  );
};

export { EditProfile };
