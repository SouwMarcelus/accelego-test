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
