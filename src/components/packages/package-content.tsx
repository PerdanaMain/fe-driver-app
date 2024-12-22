"use client";
import { Sender } from "@/types/sender";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import AddModal from "./add-modal";
import Swal from "sweetalert2";
import apiUrl from "@/lib/api-url";
import { Package } from "@/types/package";
import UpdateModal from "./update-modal";
import DetailModal from "./detail-modal";

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

  const [error, setError] = useState<String>("");
  const router = useRouter();

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
            <DetailModal pkg={item} />
            <UpdateModal pkg={item} />
            <Tooltip color="danger" content="Delete user">
              <button
                className="text-lg text-danger cursor-pointer active:opacity-50"
                type="button"
                onClick={() => deleteHandler(item.id)}
              >
                <DeleteIcon />
              </button>
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

  const deleteHandler = (id: string) => {
    try {
      Swal.fire({
        title: "Deletion confirmation",
        text: "The delete action can't be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response: any = await fetch(`${apiUrl.apiUrl}/packages/${id}`, {
            method: "delete",
          });

          if (response.ok) {
            return Swal.fire({
              title: "Packages deleted",
              text: response.message,
              icon: "info",
              showConfirmButton: true,
            }).then(() => router.refresh);
          } else {
            Swal.fire({
              title: "Error while deleting package",
              text: response.message,
              icon: "error",
            });
          }
        }
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const deleteAllHandler = async () => {
    try {
      Swal.fire({
        title: "Deletion confirmation",
        text: "The delete action can't be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response: any = await fetch(`${apiUrl.apiUrl}/packages/`, {
            method: "delete",
          });
          if (response.ok) {
            return Swal.fire({
              title: "Packages deleted",
              text: response.message,
              icon: "info",
              showConfirmButton: true,
            }).then(() => router.refresh);
          } else {
            Swal.fire({
              title: "Error while deleting package",
              text: response.message,
              icon: "error",
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error while deleting packages",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
        <Sidebar />
        <div className="col-span-6 py-3 px-5">
          <AddModal senderData={senderData} />

          <Button color="warning" className="ms-3" onPress={deleteAllHandler}>
            Delete All Packages
          </Button>
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
