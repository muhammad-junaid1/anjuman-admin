import { useState } from 'react';
import { Input, Button, Table, Tbody, Tr, Td, Th, Thead, TableContainer, Box } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { getApi } from 'services/api';

const PostsPage = () => {
  const [postId, setPostId] = useState('');
  const [posts, setPosts] = useState([]); // Example: This would come from an API call

  const handleSearch = async () => {
      try {
        const posts = await getApi("api/posts/all?_id="+postId);  
        setPosts(posts.data ||[])
      } catch (error) {
        console.log(error); 
        toast.error("something went wrong"); 
      }
  };

  const handleDelete = (postId) => {
    // Logic to delete post (replace with API call)
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Box className='mt-4'>
      <Box mb={4}>
        <Input
          placeholder="Search Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <Button onClick={handleSearch} mt={3}>
          Search
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Post ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>{post.id}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PostsPage;
