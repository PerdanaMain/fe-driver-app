"use client";

import { Package } from "@/types/package";
import { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon, EyeIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const DetailModal = ({ pkg }: { pkg: Package }) => {
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

  return (
    <>
      <Tooltip content="Show Detail" color="primary">
        <Button
          className="bg-transparent"
          size="sm"
          color="warning"
          onPress={onOpen}
          startContent={<EyeIcon />}
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
            <div>
              <ModalHeader className="flex flex-col gap-1">
                Update Package
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-blue-600 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <h2 className="text-lg font-semibold">
                        Receiver Details
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Name</span>
                        <span className="font-medium">{receiverName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Address</span>
                        <span className="font-medium">{receiverAddress}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Phone</span>
                        <span className="font-medium">{receiverPhone}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">
                          Coordinates
                        </span>
                        <span className="font-medium">
                          {receiverLatitude}, {receiverLongitude}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-green-600 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <h2 className="text-lg font-semibold">Sender Details</h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Name</span>
                        <span className="font-medium">{senderName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Address</span>
                        <span className="font-medium">{senderAddress}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Phone</span>
                        <span className="font-medium">{senderPhone}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">
                          Coordinates
                        </span>
                        <span className="font-medium">
                          {senderLatitude}, {senderLongitude}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailModal;
