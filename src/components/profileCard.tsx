'use client'

import { useState } from "react";

export function ProfileCard() {
  const [trackInfo, setTrackInfo] = useState({})

  /**
   * This is an example of a basic node.js script that performs
   * the Client Credentials oAuth2 flow to authenticate against
   * the Spotify Accounts.
   *
   * For more information, read
   * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
   */

  const client_id = "257c271479594ec6b5e47ff9e8d8e508";
  const client_secret = "82b197cc74484f949f42e5c6fa21d9ce";

  async function getToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    });

    return await response.json();
  }

  async function getTrackInfo(access_token) {
    const response = await fetch(
      "https://api.spotify.com/v1/artists/3nFkdlSjzX9mRTtwJOzDYB/albums",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
      }
    );

    return await response.json();
  }

  async function getProfile() {
    const token =  await getToken()

    const trackInfo = await getTrackInfo(token.access_token)
    setTrackInfo(trackInfo)
    console.log(trackInfo)

  }

  console.log(trackInfo)

  return (
    <>
      <p>{trackInfo.name}</p>
      <button onClick={getProfile}>get Info</button>
    </>
    );
}
