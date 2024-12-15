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
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const AddModal = ({ senderData }: { senderData: Sender[] }) => {
  const { data: session, status } = useSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [receiverLatitude, setReceiverLatitude] = useState<string>("");
  const [receiverLongitude, setReceiverLongitude] = useState<string>("");
  const [sender, setSender] = useState<Set<string>>(new Set([]));
  const [error, setError] = useState<string>("");

  const token = session?.user?.token ?? null;
  const selectData = useMemo(
    () =>
      senderData.map((item) => ({
        key: item.id,
        label: `${item.name} - ${item.address}`,
      })),
    [senderData]
  );

  const submitHandler = async (e: any) => {
    try {
      // Dapatkan sender ID dari Set
      const selectedSenderId = Array.from(sender)[0];

      // Validasi input
      if (
        !selectedSenderId ||
        !receiverName ||
        !receiverPhone ||
        !receiverAddress
      ) {
        throw new Error("Please fill all required fields");
      }

      const res = await fetch(`${apiUrl.apiUrl}/packages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: selectedSenderId,
          receiverName: receiverName,
          receiverPhone: receiverPhone,
          receiverAddress: receiverAddress,
          receiverLatitude: receiverLatitude || null,
          receiverLongitude: receiverLongitude || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create package");
      }

      const data = await res.json();
      console.log("Package created:", data);

      // Reset form
      setReceiverName("");
      setReceiverPhone("");
      setReceiverAddress("");
      setReceiverLatitude("");
      setReceiverLongitude("");
      setSender(new Set([]));
    } catch (error: any) {
      console.error("Error creating package:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Package
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={submitHandler}>
              <ModalHeader className="flex flex-col gap-1">
                Create Package
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter The Name"
                  variant="bordered"
                  type="text"
                  value={receiverName}
                  onChange={(e: any) => setReceiverName(e.target.value)}
                />

                <Select
                  label="Select Sender"
                  placeholder="Select a sender"
                  selectedKeys={sender}
                  className="w-full"
                  onSelectionChange={(keys) => setSender(keys as Set<string>)}
                >
                  {selectData.map((sender) => (
                    <SelectItem key={sender.key} value={sender.key}>
                      {sender.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Address"
                  placeholder="Enter The Address"
                  variant="bordered"
                  type="text"
                  value={receiverAddress}
                  onChange={(e: any) => setReceiverAddress(e.target.value)}
                />
                <Input
                  label="Phone"
                  placeholder="Enter The Phone"
                  variant="bordered"
                  type="text"
                  value={receiverPhone}
                  onChange={(e: any) => setReceiverPhone(e.target.value)}
                />
                <Input
                  label="Latitude"
                  placeholder="Enter The Latitude"
                  variant="bordered"
                  type="text"
                  value={receiverLatitude}
                  onChange={(e: any) => setReceiverLatitude(e.target.value)}
                />
                <Input
                  label="Longitude"
                  placeholder="Enter The Longitude"
                  variant="bordered"
                  type="text"
                  value={receiverLongitude}
                  onChange={(e: any) => setReceiverLongitude(e.target.value)}
                />
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
