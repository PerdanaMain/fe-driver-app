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
  Tooltip,
} from "@nextui-org/react";
import { Sender } from "@/types/sender";
import { useCallback } from "react";
import AddModal from "./add-modal";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";

interface Package {
  id: number;
  receiver: {
    id: number;
    name: string;
    phone: string;
    address: string;
  };
  sender: {
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
        return item.receiver?.name || "-";
      case "phone":
        return item.receiver?.phone || "-";
      case "address":
        return item.receiver?.address || "-";
      case "sender":
        return item.sender?.name || "-";
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
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
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <Sidebar />
        <div className="col-span-6 py-3 px-5">
          <AddModal senderData={senderData} />
          <Table aria-label="Package table" className="mt-5">
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
