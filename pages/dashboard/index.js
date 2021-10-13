import React, {useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Table,
  Spinner,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,Button,
  Tfoot,Link
} from "@chakra-ui/react";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {getProvider, deleteProvider} from '../../api/provider';


export default function Dashboard() {
  const { logout, auth, setReloadUser } = useAuth();
  const [providers, setProviders] = useState([]);
  const [updateProvider, setUpdateProvider] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProvider(auth.idUser);
      setProviders(response.providers);
      setUpdateProvider(false);
    })();
  }, [updateProvider, auth]);


  const DeteleItem = async (id) => {
    await deleteProvider(id);
    setUpdateProvider(true);
  };


  return (
    <AdminLayout>
      <div className="container">
      <Link href="/dashboard/create"> 
        <Button leftIcon={<EditIcon />} colorScheme="whatsapp" variant="solid">
                  Create
        </Button>
      </Link>

      {!providers ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}

        <Table variant="simple" colorScheme="whatsapp">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>number</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
              <Th>Active</Th>
            </Tr>
          </Thead>
          <Tbody>
          {map(providers, (item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.createdAt}</Td>
              <Td>
              <Link href={`/dashboard/${item._id}`}>
                <Button leftIcon={<EditIcon />} colorScheme="teal" variant="solid">
                  Edit
                </Button>
              </Link>
                <Button onClick={() => DeteleItem(item._id)} leftIcon={<DeleteIcon />} colorScheme="pink" variant="solid" ml={2}>
                  Delete
                </Button>
              
              </Td>
              <Td>{item.active ? "True" : "False" }</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </AdminLayout>
  );
}
