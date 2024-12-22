import apiUrl from "@/lib/api-url";
import { Sender } from "@/types/sender";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const AddModal = ({ senderData }: { senderData: Sender[] }) => {
  const { data: session, status } = useSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [receiverLatitude, setReceiverLatitude] = useState<string>("");
  const [receiverLongitude, setReceiverLongitude] = useState<string>("");

  const [senderName, setSenderName] = useState<string>("");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [senderAddress, setSenderAddress] = useState<string>("");
  const [senderLatitude, setSenderLatitude] = useState<string>("");
  const [senderLongitude, setSenderLongitude] = useState<string>("");

  const [error, setError] = useState<string>("");

  const token = session?.user?.token ?? null;

  const submitHandler = async (e: any) => {
    try {
      const res: any = await fetch(`${apiUrl.apiUrl}/packages`, {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

      if (res.ok) {
        return Swal.fire({
          title: "Packages deleted",
          text: res.message,
          icon: "info",
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          title: "Error while deleting package",
          text: res.message,
          icon: "error",
        });
      }

      const data = await res.json();
      console.log("Package created:", data);

      // Reset form
      setReceiverName("");
      setReceiverPhone("");
      setReceiverAddress("");
      setReceiverLatitude("");
      setReceiverLongitude("");

      setSenderName("");
      setSenderPhone("");
      setSenderAddress("");
      setSenderLatitude("");
      setSenderLongitude("");
    } catch (error: any) {
      Swal.fire({
        title: "Error while deleting packages",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Package
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={submitHandler}>
              <ModalHeader className="flex flex-col gap-1">
                Create Package
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

export default AddModal;
