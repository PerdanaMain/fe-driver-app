"use client";

import { Package } from "@/types/package";
import { useState } from "react";

import apiUrl from "@/lib/api-url";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const UpdateModal = ({ pkg }: { pkg: Package }) => {
  const { data: session, status } = useSession();
  const token = session?.user?.token ?? "";

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [receiverName, setReceiverName] = useState<string>(pkg?.receiver.name);
  const [receiverPhone, setReceiverPhone] = useState<string>(
    pkg?.receiver.phone
  );
  const [receiverAddress, setReceiverAddress] = useState<string>(
    pkg?.receiver.address
  );
  const [receiverLatitude, setReceiverLatitude] = useState<string>(
    pkg?.receiver.latitude
  );
  const [receiverLongitude, setReceiverLongitude] = useState<string>(
    pkg?.receiver.longitude
  );

  const [senderName, setSenderName] = useState<string>(pkg?.sender.name);
  const [senderPhone, setSenderPhone] = useState<string>(pkg?.sender.phone);
  const [senderAddress, setSenderAddress] = useState<string>(
    pkg?.sender.address
  );
  const [senderLatitude, setSenderLatitude] = useState<string>(
    pkg?.sender.latitude
  );
  const [senderLongitude, setSenderLongitude] = useState<string>(
    pkg?.sender.longitude
  );

  const submitHandler = async (e: any) => {
    e.prefentDefault();
    try {
      const response = await fetch(`${apiUrl.apiUrl}/packages/${pkg.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverName: receiverName,
          receiverPhone: receiverPhone,
          receiverAddress: receiverAddress,
          receiverLatitude: receiverLatitude || null,
          receiverLongitude: receiverLongitude || null,

          senderName: senderName,
          senderPhone: senderPhone,
          senderAddress: senderAddress,
          senderLatitude: senderLatitude || null,
          senderLongitude: senderLongitude || null,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Package updated!",
          text: "Package Updated Successfully",
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "Package Not Updated!",
          text: "Sorry, Error while updating package",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Sorry, Error while updating package",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <>
      <Tooltip content="Edit user" color="warning">
        <Button
          className="bg-transparent"
          size="sm"
          color="warning"
          onPress={onOpen}
          startContent={<EditIcon />}
        ></Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={(e) => submitHandler(e)}>
              <ModalHeader className="flex flex-col gap-1">
                Update Package
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-2">
                  <div id="receiver-side">
                    <Input
                      className="mb-2"
                      label="Receiver Name"
                      placeholder="Enter The Name"
                      variant="bordered"
                      type="text"
                      value={receiverName}
                      onChange={(e: any) => setReceiverName(e.target.value)}
                    />

                    <Input
                      className="mb-2"
                      label="Receiver Address"
                      placeholder="Enter The Address"
                      variant="bordered"
                      type="text"
                      value={receiverAddress}
                      onChange={(e: any) => setReceiverAddress(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Receiver Phone"
                      placeholder="Enter The Phone"
                      variant="bordered"
                      type="text"
                      value={receiverPhone}
                      onChange={(e: any) => setReceiverPhone(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Receiver Latitude"
                      placeholder="Enter The Latitude"
                      variant="bordered"
                      type="text"
                      value={receiverLatitude}
                      onChange={(e: any) => setReceiverLatitude(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Receiver Longitude"
                      placeholder="Enter The Longitude"
                      variant="bordered"
                      type="text"
                      value={receiverLongitude}
                      onChange={(e: any) =>
                        setReceiverLongitude(e.target.value)
                      }
                    />
                  </div>
                  <div id="sender-side">
                    <Input
                      className="mb-2"
                      label="Sender Name"
                      placeholder="Enter The Name"
                      variant="bordered"
                      type="text"
                      value={senderName}
                      onChange={(e: any) => setSenderName(e.target.value)}
                    />

                    <Input
                      className="mb-2"
                      label="Sender Address"
                      placeholder="Enter The Address"
                      variant="bordered"
                      type="text"
                      value={senderAddress}
                      onChange={(e: any) => setSenderAddress(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Sender Phone"
                      placeholder="Enter The Phone"
                      variant="bordered"
                      type="text"
                      value={senderPhone}
                      onChange={(e: any) => setSenderPhone(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Sender Latitude"
                      placeholder="Enter The Latitude"
                      variant="bordered"
                      type="text"
                      value={senderLatitude}
                      onChange={(e: any) => setSenderLatitude(e.target.value)}
                    />
                    <Input
                      className="mb-2"
                      label="Sender Longitude"
                      placeholder="Enter The Longitude"
                      variant="bordered"
                      type="text"
                      value={senderLongitude}
                      onChange={(e: any) => setSenderLongitude(e.target.value)}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
