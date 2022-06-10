import { Form, Button, Input } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex } from ".";
const { TextArea } = Input;

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  inputType,
  closeEditBox,
  inputRef,
}) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Form.Item>
        <TextArea
          ref={inputRef}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={onChange}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Flex>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={() => {
              if (!isAuth) {
                return navigate("/login");
              }
              onSubmit();
            }}
            type="primary"
          >
            {inputType === "add" ? "Add comment" : "Edit comment"}
          </Button>
          {inputType === "edit" && (
            <Button onClick={() => closeEditBox()}>Cancel Edit</Button>
          )}
        </Flex>
      </Form.Item>
    </>
  );
};
export { Editor };
