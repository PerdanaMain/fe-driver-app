"use client";

import SenderContent from "../../components/sender-content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import apiUrl from "@/lib/api-url";

export default function Page() {
  const { data: session, status } = useSession();
  const token = session?.user?.token ?? null;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl.apiUrl}/senders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Tambahkan jika kamu mengirim data JSON
          },
        });

        // Periksa jika response tidak OK
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    if (token) {
      fetchData();
    }
  }, [apiUrl, token]);

  if (!data) return <div>Loading...</div>;
  ``;

  return <SenderContent senderData={data} />;
}
