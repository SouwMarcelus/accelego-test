import Link from "next/link";
import { Button, message } from "antd";
import { SettingFilled } from "@ant-design/icons";

export default function Navbar({
  loggedIn,
  user,
  isUserPage,
  updateLoggedIn,
  updateAuthMethod,
  updateAuthenticating,
  updateUser,
  updateIsUserPage,
}) {
  const [messageApi, contextHolder] = message.useMessage();

  function successMessage(message) {
    messageApi.open({
      type: "success",
      content: message,
    });
  }

  function warningMessage(message) {
    messageApi.open({
      type: "warning",
      content: message,
    });
  }

  function errorMessage(error) {
    messageApi.open({
      type: "success",
      content: error,
    });
  }

  function handleLogin() {
    updateAuthenticating(true);
    updateAuthMethod("Login");
  }

  function handleRegister() {
    updateAuthenticating(true);
    updateAuthMethod("Register");
  }

  function handleLogout() {
    updateUser({});
    updateLoggedIn(false);
    updateIsUserPage(false);
    successMessage("Successfully logged out.");
  }

  function handleUserPage() {
    if (isUserPage) {
      updateIsUserPage(false);
    } else {
      updateIsUserPage(true);
    }
  }

  return (
    <header>
      {contextHolder}

      <nav className="flex h-12 flex-col shadow-md">
        <ul className="m-0 flex h-full list-none flex-row items-center justify-between pe-4 ps-4">
          <li>
            <Link
              href="/"
              className="font-semibold text-black no-underline visited:text-black"
              onClick={() => updateAuthenticating(false)}
            >
              RAQ
            </Link>
          </li>

          <li className="*:ms-2">
            {loggedIn ? (
              <>
                {isUserPage ? null : (
                  <Button onClick={handleUserPage}>
                    <SettingFilled />
                  </Button>
                )}
                <Button danger onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleRegister}>Register</Button>
                <Button type="primary" onClick={handleLogin}>
                  Login
                </Button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
