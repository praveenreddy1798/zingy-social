import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deletePost } from "../slices";

const MenuDropdown = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu
      items={[
        {
          label: "Edit Post",
          onClick: async () => {
            navigate(`/post/edit/${postId}`);
          },
        },
        {
          label: "Delete Post",
          onClick: () => {
            dispatch(deletePost(postId));
            navigate("/");
          },
        },
      ]}
    />
  );

  return (
    <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight">
      <EllipsisOutlined rotate={270} />
    </Dropdown>
  );
};

export { MenuDropdown };
