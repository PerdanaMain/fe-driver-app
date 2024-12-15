import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import apiUrl from "@/lib/api-url";

const Create = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();

  const submitHandler = async () => {
    try {
      const result = await fetch(`${apiUrl.apiUrl}/sender`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Sender
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Sender
              </ModalHeader>
              <ModalBody>
                <Input
                  // endContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Name"
                  placeholder="Enter The Name"
                  variant="bordered"
                  type="text"
                />
                <Input
                  // endContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Address"
                  placeholder="Enter The Address"
                  variant="bordered"
                  type="text"
                />
                <Input
                  // endContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Phone"
                  placeholder="Enter The Phone"
                  variant="bordered"
                  type="text"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Create;
