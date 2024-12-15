"use client";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Sender } from "@/types/sender";
import { useCallback } from "react";
import AddModal from "./add-modal";

interface Package {
  id: number;
  Receiver: {
    id: number;
    name: string;
    phone: string;
    address: string;
  };
  Sender: {
    id: number;
    name: string;
    phone: string;
    address: string;
  };
}

const PackageContent = ({
  packageData,
  senderData,
}: {
  packageData: Package[];
  senderData: Sender[];
}) => {
  const rows = packageData.map((item, index) => ({
    ...item,
    key: item.id || index + 1,
  }));

  const renderCell = useCallback((item: Package, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return item.Receiver?.name || "-";
      case "phone":
        return item.Receiver?.phone || "-";
      case "address":
        return item.Receiver?.address || "-";
      case "sender":
        return item.Sender?.name || "-";
      default:
        return "-";
    }
  }, []);

  const columns = [
    {
      key: "name",
      label: "Receiver Name",
    },
    {
      key: "phone",
      label: "Receiver Phone",
    },
    {
      key: "address",
      label: "Receiver Address",
    },
    {
      key: "sender",
      label: "Sender Name",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <Sidebar />
        <div className="col-span-6 py-3 px-5">
          <AddModal senderData={senderData} />
          <Table 
            aria-label="Package table" 
            className="mt-5"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows} emptyContent={"No packages available."}>
              {(item: Package) => (
                <TableRow key={item.id}>
                  {(columnKey: any) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PackageContent;