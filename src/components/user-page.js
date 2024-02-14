import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex, List, message } from "antd";

export default function UserPage({ user, updateUser, updateIsUserPage }) {
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
      type: "error",
      content: error,
    });
  }

  function handleDelete(quote) {
    const newUser = { ...user };

    for (let i = 0; i < newUser.favourites.length; i++) {
      if (newUser.favourites[i].id === quote.id) {
        newUser.favourites.splice(i, 1);
        updateUser(newUser);

        successMessage(`Quote from ${quote.anime} removed from favourites.`);

        break;
      }
    }
  }

  return (
    <>
      {contextHolder}

      <Flex justify="start" align="start" className="absolute left-5 top-16">
        <Button
          onClick={() => {
            updateIsUserPage(false);
          }}
        >
          <span>
            <ArrowLeftOutlined />
          </span>
        </Button>
      </Flex>

      <h2>Hello, {user.first_name}!</h2>

      <div className="mb-4 h-5/6 w-5/6 overflow-auto rounded-lg border-2 border-solid border-neutral-200 px-4 py-0 lg:mb-10 lg:h-4/5 lg:w-11/12">
        <List
          itemLayout="horizontal"
          dataSource={user.favourites}
          renderItem={function (item) {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.anime}
                  description={`"${item.quote}" (${item.character})`}
                />

                <Button
                  danger
                  type="text"
                  onClick={() => {
                    handleDelete(item);
                  }}
                >
                  Delete
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
}
