import {
  HStack,
  VStack,
  Text,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

function TodoList({ todos, deleteTodo, editTodo }) {
  const [todo, setTodo] = useState("");
  const [modalValue, setModalValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);



  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function handleDeleteClick(todo) {
    setIsDeleteOpen(true);
    setModalValue(todo);
  }

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function handleDeleteConfirm() {
    deleteTodo(modalValue.id);
    setIsDeleteOpen(false);
  }


  

  function onClose() {
    setIsOpen(false);
  }

  function handleEditClick(todo) {
    setIsOpen(true);
    setModalValue(todo);
    console.log(todo);
  }

  function handleEditInputChange(e, id) {
    setModalValue({ ...modalValue, text: e.target.value });
    console.log(modalValue, id);
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    editTodo(modalValue.id, modalValue);
    setModalValue("");
    setIsOpen(false);
  }

  return !todos.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      No todos for Today!!
    </Badge>
  ) : (
    <VStack>
      {todos.map((todo) => (
        <HStack spacing="24px" w="320px">
          <Flex p={6} w="300px" h="50px" justifyContent="space-between">
            <Text>{todo.text}</Text>

            <Flex w="10px">
              <DeleteIcon
                color="red.500"
                mr="2"
                onClick={() => handleDeleteClick(todo)}
              />
              <EditIcon onClick={() => handleEditClick(todo)} />
            </Flex>

            {/* modal for editing a todo */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Your Todo</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleEditSubmit}>
                  <ModalBody>
                    <Input
                      value={modalValue.text}
                      key={modalValue.id}
                      variant="outline"
                      type="text"
                      placeholder="Update your todo..."
                      onChange={handleEditInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" colorScheme="teal" mr={3}>
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>



            <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Your Todo</ModalHeader>
                <ModalCloseButton />
                {/* <form onSubmit={handleEditSubmit}> */}
                <ModalBody>
                  Are you sure you want to delete this todo?
                </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleDeleteConfirm}>
                    Delete
                  </Button>
                  <Button type="submit" mr={3} onClick={closeDeleteModal}>
                    Cancel
                  </Button>
                  </ModalFooter>
                {/* </form> */}
              </ModalContent>
            </Modal>

          </Flex>
        </HStack>




      ))}

     

    </VStack>
  );
}

export default TodoList;
