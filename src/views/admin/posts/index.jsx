import { useState } from 'react';
import { Input, Button, Table, Tbody, Tr, Td, Th, Thead, TableContainer, Box } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { getApi } from 'services/api';
import PostDetailsModal from './PostDetailsModal';
import { postApi } from 'services/api';

const PostsPage = () => {
  const [postId, setPostId] = useState('');
  const [posts, setPosts] = useState([]); // Example: This would come from an API call
   const [postDetailsModal, setPostDetailsModal] = useState({
    isOpen: false,
    data: null,
  });

  const handleSearch = async () => {
      try {
        const posts = await getApi("api/posts/all?_id="+postId);  
              if (posts.data.length === 0 || !posts.data) {
        toast.error("No posts found with the given id");
        return;
      }
        setPosts(posts.data ||[])
      } catch (error) {
        console.log(error); 
        toast.error("something went wrong"); 
      }
  };

    const handleDelete = async (postId) => {
    try {
        await postApi("api/admin/delete-post", {
        post: postId
        })
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully");
        
    } catch (error) {
      console.log(error); 
    }
  };

    const handleShowDetails = (post) => {
    setPostDetailsModal({
      isOpen: true,
      data: post,
    }) 
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
              <Tr key={post._id}>
                <Td>{post._id}</Td>
                <Td>
                  <Box display={"flex"} alignItems={"center"} className='space-x-2'>
                    <Button onClick={() => handleShowDetails(post)} colorScheme="green" >
                      Details
                    </Button>
                    <Button colorScheme="red" onClick={() => handleDelete(post._id)}>
                      Delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {postDetailsModal?.isOpen && (
        <PostDetailsModal
          data={postDetailsModal?.data}
          isOpen={postDetailsModal?.isOpen}
          onClose={() => setPostDetailsModal({ isOpen: false, data: null })}
        />
      )}
    </Box>
  );
};

export default PostsPage;
