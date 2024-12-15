"use client";

import PackageContent from "../../components/packages/package-content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import apiUrl from "@/lib/api-url";
import { Sender } from "@/types/sender";

export default function Page() {
  const { data: session, status } = useSession();
  const token = session?.user?.token ?? null;

  const [data, setData] = useState(null);
  const [senderData, setSenderData]: any = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl.apiUrl}/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Tambahkan jika kamu mengirim data JSON
          },
        });

        const sender = await fetch(`${apiUrl.apiUrl}/senders`, {
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
        const result2 = await sender.json();

        setData(result?.data ?? []);
        setSenderData(result2?.data ?? []);
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

  return <PackageContent senderData={senderData} packageData={data} />;
}
