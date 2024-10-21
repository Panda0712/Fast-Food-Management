import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Cập nhật tài khoản</Heading>

      <Row>
        <Heading as="h3">Cập nhật dữ liệu người dùng</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Cập nhật mật khẩu</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
