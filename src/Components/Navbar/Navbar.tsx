import {
  Box, Button,
  Flex, Heading, Link, Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const userData = useSelector((state:RootState) => state.userData);
  return (
    <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
      <Flex h="7vh" alignItems="center" justifyContent="space-between">
        <Flex justify="center" align="center">
          <Heading size="md">
            hello
            {' '}
            {userData.userName}
          </Heading>
          <Button variant="ghost" mr="1rem">Home</Button>
        </Flex>
        <Flex alignItems="center">
          <Stack direction="row" spacing={2}>
            <Link mr="1rem" variant="ghost" href="/Register">Register</Link>
          </Stack>
          <Link mr="1rem" variant="ghost" href="/TestsHistory">Tests history</Link>
          <Link mr="1rem" variant="ghost" href="/NewTest">New Tests</Link>
          <Button variant="ghost" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
