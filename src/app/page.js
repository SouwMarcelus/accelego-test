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
