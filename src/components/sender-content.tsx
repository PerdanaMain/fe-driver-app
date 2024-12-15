"use client";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import { Sender } from "@/types/sender";

const SenderContent = ({ senderData }: { senderData: Sender }) => {
  const rows = senderData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    };
  });

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "address",
      label: "Address",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <Sidebar />
        <div className="col-span-6 bg-white rounded-xl shadow py-3 px-5">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns} className="text-left">
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item: any) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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

export default SenderContent;