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
  Tfoot
} from "@chakra-ui/react";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {getProvider} from '../../api/provider';


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


  return (
    <AdminLayout>
      <div className="container">
          1
      </div>
    </AdminLayout>
  );
}
