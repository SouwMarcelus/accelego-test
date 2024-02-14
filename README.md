# Introduction

This is a [Next.js](https://nextjs.org/) project using version `14.1.0`, set up with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's styled using [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs) and [Ant Design](https://ant.design/docs/react/use-with-next).

# Description

The entire application relies on a single component that dynamically swaps its children components based on predefined states for navigation and "storing" data. While it could be more straightforward using `next`'s own route handler and a database to mimic a server, the decision was made to keep the focus on Front-End development.

## How to use

Steps:

- Go to [https://accelego-test.vercel.app/](https://accelego-test.vercel.app/).
- Browse the random quotes
- Login or register an account using listed emails below and any password to add quotes to favourites.
- Go to user page to browse favourited quotes (the button before logout button).
- Search a random quote based on anime's title or character using the search input.

Due to limitations of `animechan`'s API, random quote list request will be limited safely to 50 to avoid the block of too many or frequent requests.

```jsx
<InfiniteScroll
  dataLength={listData.length}
  next={loadMoreListData}
  hasMore={listData.length < 50} // limited to 50
  loader={<Skeleton paragraph={{ rows: 4 }} active />}
  endMessage={
    <Divider plain>This is the safe limit of the API 🤐</Divider>
  }
  scrollableTarget="scrollableDiv"
>
```

And due to limitations of `reqres`'s API, register or login method can only work using one these emails:

```js
[
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg",
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
    avatar: "https://reqres.in/img/faces/9-image.jpg",
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
    avatar: "https://reqres.in/img/faces/10-image.jpg",
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
    avatar: "https://reqres.in/img/faces/11-image.jpg",
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
    avatar: "https://reqres.in/img/faces/12-image.jpg",
  },
];
```

## How it works

The main `page.js` sets up the project's entire layout.

```jsx
"use client";

import { useCallback, useState } from "react";
import { Flex } from "antd";

import Navbar from "@/components/navbar";
import RandomQuotesList from "@/components/random-quotes-list";
import SearchQuote from "@/components/search-quote";
import Authentication from "@/components/authentication";
import UserPage from "@/components/user-page";

export default function Home() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [authMethod, setAuthMethod] = useState("");
  const [isUserPage, setIsUserPage] = useState(false);

  const updateUser = useCallback(
    function (values) {
      setUser(values);
    },
    [user],
  );

  const updateAuthenticating = useCallback(
    function (values) {
      setAuthenticating(values);
    },
    [authenticating],
  );

  const updateLoggedIn = useCallback(
    function (value) {
      setLoggedIn(value);
    },
    [loggedIn],
  );

  const updateAuthMethod = useCallback(
    function (value) {
      setAuthMethod(value);
    },
    [authMethod],
  );

  const updateIsUserPage = useCallback(
    function (value) {
      setIsUserPage(value);
    },
    [UserPage],
  );

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        user={user}
        isUserPage={isUserPage}
        updateLoggedIn={updateLoggedIn}
        updateAuthMethod={updateAuthMethod}
        updateAuthenticating={updateAuthenticating}
        updateUser={updateUser}
        updateIsUserPage={updateIsUserPage}
      />

      <main className="h-[calc(100vh-3rem)]">
        <Flex
          vertical
          gap="small"
          justify="center"
          align="center"
          className="h-full w-full"
        >
          {authenticating ? (
            <Authentication
              authMethod={authMethod}
              updateAuthenticating={updateAuthenticating}
              updateLoggedIn={updateLoggedIn}
              updateUser={updateUser}
              user={user}
            />
          ) : (
            <>
              {isUserPage ? (
                <>
                  <h1 className="m-4 lg:m-6">User Account</h1>
                  <UserPage
                    user={user}
                    updateUser={updateUser}
                    updateIsUserPage={updateIsUserPage}
                  />
                </>
              ) : (
                <>
                  <h1 className="m-4 lg:m-6">Random Anime Quotes</h1>
                  <SearchQuote />
                  <RandomQuotesList user={user} updateUser={updateUser} />
                </>
              )}
            </>
          )}
        </Flex>
      </main>
    </>
  );
}
```

The core concept involves using the `useCallback()` hook to update the states defined in `page.js` from other components, enabling navigation and data storage.

Here's an example of updating the `user` state that stores user information from another component.

```jsx
"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Divider, List, Skeleton, message } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export default function RandomQuotesList({ user, updateUser }) {
  const [listLoading, setListLoading] = useState(false);
  const [listData, setListData] = useState([]);
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

  async function loadMoreListData() {
    if (listLoading) {
      return;
    }

    setListLoading(true);

    try {
      const response = await fetch("https://animechan.xyz/api/quotes");
      const responseStatus = response.status;

      if (responseStatus === 429) {
        errorMessage(
          "Too many requests on quotes list. Please wait a moment and then refresh the page.",
        );
        setListLoading(false);
        return;
      } else {
        const responseBody = await response.json();

        setListData([...listData, ...responseBody]);
      }
    } catch (error) {
      errorMessage(error.toString());
    } finally {
      setListLoading(false);
    }
  }

  function handleFavourite(quote) {
    if (Object.keys(user).length === 0) {
      errorMessage("You must log in to do that.");
    } else {
      const newUser = { ...user };
      const quoteIndex = newUser.favourites.findIndex(function (element) {
        return element.id === quote.id;
      });

      if (quoteIndex !== -1) {
        newUser.favourites.splice(quoteIndex, 1);
        successMessage(`Quote from ${quote.anime} removed from favourites.`);
      } else {
        newUser.favourites.push(quote);
        successMessage(`Quote from ${quote.anime} favourited.`);
      }

      updateUser(newUser);
      console.log(newUser);
    }
  }

  useEffect(function () {
    loadMoreListData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      className="mb-4 h-5/6 w-5/6 overflow-auto rounded-lg border-2 border-solid border-neutral-200 px-4 py-0 lg:mb-10 lg:h-4/5 lg:w-11/12"
    >
      {contextHolder}

      <InfiniteScroll
        dataLength={listData.length}
        next={loadMoreListData}
        hasMore={listData.length < 50}
        loader={<Skeleton paragraph={{ rows: 4 }} active />}
        endMessage={
          <Divider plain>This is the safe limit of the API 🤐</Divider>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={listData}
          renderItem={function (item) {
            const isFavourited =
              user.favourites &&
              user.favourites.some(function (element) {
                return element.id === item.id;
              });

            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.anime}
                  description={`"${item.quote}" (${item.character})`}
                  className="pe-3 lg:pe-1"
                />

                <Button
                  onClick={() => {
                    handleFavourite(item);
                  }}
                >
                  {isFavourited ? <StarFilled /> : <StarOutlined />}
                </Button>
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
}
```

The `updateUser()` callback is used in the `handleFavourite()` function to change the state of `user` in `page.js`. This enables the reactive state of `user` to be read and updated from every component that has this property, facilitating communication between components.

So, communication between components relies on the `useCallback()` hook, passed as a property to other components. Here's a step-by-step breakdown:

- First, define the state in a parent component which in this case is `page.js`.

```jsx
const [user, setUser] = useState({});
```

- And then wrap it using `useCallback()` hook.

```jsx
const updateUser = useCallback(
  function (values) {
    setUser(values);
  },
  [user],
);
```

- Then we can pass the callback function to a child component, in this case it is `RandomQuoteList`

```jsx
export default function RandomQuotesList({ user, updateUser }) {
    ...
}
```

- Which then can be used like this

```jsx
updateUser(newUser);
```

The entire application's flow is based on these callbacks to create a seamless, pageless application.

## Down sides of this approach

It's important to note that, with this approach, the `user` state only persists as long as users remain on the page. Leaving the page will terminate all those states, requiring a logged-in user to log in again.

This drawback could be addressed by using Next's own route handler with these steps:

- Creating API routes to handle user registration, login, logout, etc.
- Implementing a token framework like `jose` to save user information as cookies.

However, since the main focus here is on Front-End development, this workflow is considered the best approach.

# References

To learn more about the frameworks being used, refer the following resources may help:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://react.dev/reference/react) - explore React features.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - understand Tailwind CSS features.
- [Ant Design Documentation](https://ant.design/) - explore Ant Design features.
