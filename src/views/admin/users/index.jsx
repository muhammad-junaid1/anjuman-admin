import { useState } from "react";
import {
  Input,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { getApi } from "services/api";
import { toast } from "react-toastify";
import SendMessageModal from "./SendMessageModal";
import UserDetailsModal from "./UserDetailsModal";
import { postApi } from "services/api";

const UsersPage = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]); // Example: This would typically come from an API call
  const [sendMessageModal, setSendMessageModal] = useState({
    isOpen: false,
    data: null,
  });
  const [userDetailsModal, setUserDetailsModal] = useState({
    isOpen: false,
    data: null,
  });

  const handleSearch = async () => {
    try {
      const users = await getApi("api/users/all?username=" + username);
      if (users.data.length === 0 || !users.data) {
        toast.error("No users found with the given username");
        return;
      }
      setUsers(users.data || []);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async (userId) => {
    try {
        await postApi("api/admin/delete-user", {
          user: userId
        })
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
        
    } catch (error) {
      console.log(error); 
    }
  };

  const handleSendMessage = (user) => {
    setSendMessageModal({
      isOpen: true,
      data: user,
    });
  };

  const handleShowDetails = (user) => {
    setUserDetailsModal({
      isOpen: true,
      data: user,
    }) 
  };

  return (
    <Box className="mt-4">
      <Box mb={4}>
        <Input
          placeholder="Search Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleSearch} mt={3}>
          Search
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleShowDetails(user)}
                    mr={2}
                  >
                    Details
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(user._id)}
                    mr={2}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => handleSendMessage(user)}
                  >
                    Send Message
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {sendMessageModal?.isOpen && (
        <SendMessageModal
          data={sendMessageModal?.data}
          isOpen={sendMessageModal?.isOpen}
          onClose={() => setSendMessageModal({ isOpen: false, data: null })}
        />
      )}

      {userDetailsModal?.isOpen && (
        <UserDetailsModal
          data={userDetailsModal?.data}
          isOpen={userDetailsModal?.isOpen}
          onClose={() => setUserDetailsModal({ isOpen: false, data: null })}
        />
      )}
    </Box>
  );
};

export default UsersPage;
