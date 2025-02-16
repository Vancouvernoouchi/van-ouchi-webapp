"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      // ユーザー情報を取得
      const { data: userData, error: getUserError } =
        await supabase.auth.getUser();
      if (getUserError) {
        setUserError(getUserError);
      } else {
        setUser(userData.user);
      }

      // セッション情報を取得し、アクセストークンを取り出す
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session error:", sessionError);
      } else {
        console.log("Session:", sessionData);
        if (sessionData.session) {
          const token = sessionData.session.access_token;
          // トークンを利用してAPIにリクエスト
          try {
            const response = await fetch("http://localhost:5050/api/v1/rooms", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setApiData(responseData);
          } catch (err) {
            setApiError(err);
            console.error("Fetch error:", err);
          }
        } else {
          console.log("No session found");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Session Information</h1>
      {userError && <p>Error: {userError.message}</p>}
      {user ? <p>User: {user.email}</p> : <p>Loading user information...</p>}
      <h1>API Data</h1>
      {apiError && <p>API Error: {apiError.message}</p>}
      {apiData ? (
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      ) : (
        <p>Loading API data...</p>
      )}
    </div>
  );
};

export default Page;
