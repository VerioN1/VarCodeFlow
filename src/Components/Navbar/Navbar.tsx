import {
  Box, Button,
  Flex, Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { RootState } from '../../Redux/store';
import NavButton from './components/NavButton';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const userData = useSelector((state:RootState) => state.userData);
  return (
    <Box px={4} boxShadow="md">
      <Flex h="7vh" alignItems="center" justifyContent="space-between">
        <Flex justify="center" align="center" h="100%">
          {userData.tier === 'owner' && <NavButton text="Create New User" to="Register" colorMode={colorMode} />}
          <NavButton text="Tests history" to="TestsHistory" colorMode={colorMode} />
          <NavButton text="Create Organization" to="NewOrganization" colorMode={colorMode} />
          <NavButton text="New Test" to="NewTest/fresh" colorMode={colorMode} />
          <Button variant="ghost" mx="1rem" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button variant="ghost" onClick={() => window.location.replace('/Logout')}>
            Logout
          </Button>
        </Flex>
        <Flex alignItems="center" h="100%">
          <NavButton text="VarCode" to="" colorMode={colorMode} />
          <Heading size="md">
            hello
            {' '}
            {userData.firstName}
            {' '}
            {userData.lastName}
          </Heading>
        </Flex>
      </Flex>

    </Box>
  );
};
export default memo(Navbar);
