"use client";

import React from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      {session ? <p>Welcome {session.user.name}</p> : <p>Please login</p>}
    </div>
  );
};

export default Page;
