"use client";

import { useState } from "react";
import { Flex, Input, Modal, Radio, Spin, message } from "antd";

export default function SearchQuote() {
  const [radioValue, setRadioValue] = useState("title");
  const [randomQuote, setRandomQuote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { Search } = Input;

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

  async function handleSearch(value, event, info) {
    if (info?.source === "input") {
      setSearching(true);

      if (value) {
        if (radioValue === "title") {
          const response = await fetch(
            `https://animechan.xyz/api/random/anime?title=${value}`,
          );
          const responseText = await response.text();

          if (responseText.trim() === "") {
            setSearching(false);
            errorMessage("No related quotes found!");
          } else {
            const responseBody = await JSON.parse(responseText);

            setRandomQuote(responseBody);
            setSearching(false);
            showModal();
          }
        } else {
          const response = await fetch(
            `https://animechan.xyz/api/random/character?name=${value}`,
          );
          const responseBody = await response.json();

          if (responseBody.error) {
            setSearching(false);
            errorMessage(responseBody.error);
          } else {
            setRandomQuote(responseBody);
            setSearching(false);
            showModal();
          }
        }
      } else {
        setSearching(false);
        warningMessage("Please type something.");
      }

      setSearching(false);
    }
  }

  function handleRadioChange(event) {
    setRadioValue(event.target.value);
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <Flex
      vertical
      gap="small"
      justify="center"
      align="center"
      className="w-5/6 lg:w-1/3"
    >
      {contextHolder}

      <Search
        placeholder="I'm feeling lucky."
        allowClear
        enterButton={
          searching ? (
            <>
              <span>Search</span>

              <Spin tip="Searching..." fullscreen />
            </>
          ) : (
            <span>Search</span>
          )
        }
        size="large"
        onSearch={handleSearch}
      />

      <Radio.Group onChange={handleRadioChange} value={radioValue}>
        <Radio value="title">by title</Radio>
        <Radio value="character">by character</Radio>
      </Radio.Group>

      <Modal
        title={randomQuote.anime}
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>{`"${randomQuote.quote}" (${randomQuote.character})`}</span>
      </Modal>
    </Flex>
  );
}
