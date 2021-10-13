import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Checkbox,
  Divider,
  Box,
  Image,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { EditIcon } from "@chakra-ui/icons";
import { getProviders } from "../../api/provider";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProviderApi } from "../../api/provider";
import Link from "next/link";


export default function Dashboard() {
  const { logout, auth, setReloadUser } = useAuth();
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState({});
  const [updateProvider, setUpdateProvider] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await getProviders(auth.idUser);
        setProviders(response.providers);
        const providers = response.providers;
        const id = query.id;
        const provider = providers.filter(
          (item_provider) => item_provider._id === query.id
        )[0];
        setProvider(provider);
        setUpdateProvider(false);
        setLoading(true);
      }
    })();
  }, [query]);

  function initialValues() {
    return {
      phone: provider ? provider.phone : "",
      active: provider ? provider.active : "",
      key: provider ? provider.key : "",
    };
  }

  function validationSchema() {
    return {
      phone: Yup.string().required(true),
    };
  }

  const connect = () => {
    console.log("Connecting")
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    
    onSubmit: async (formData, { resetForm }) => {
      setIsLoading(true);
      formData.userId = auth.idUser;
      formData.name = "whatsapp";
      formData.active = formData.active;

      const response = await updateProviderApi(formData, query.id );
      if (!response.success) {
        toast({
          title: `${response.error}`,
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
      } else {
        router.push("/dashboard");
      }
      resetForm({ values: "" });
      setIsLoading(false);
    },
  });

  return (
    <AdminLayout>
      {!provider && loading && <h1>Loading...</h1>}
      {provider && loading && (
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                isInvalid={formik.errors.phone}
                name="phone"
              />

            <Input placeholder="Key" mt={5}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.key}
                      isInvalid={formik.errors.key}
                      name="key"
                      variant="filled"
              />

            </FormControl>

            <FormControl id="active" mt={5}>
              <Checkbox defaultIsChecked={provider && provider.active}
                name="active"
                onChange={formik.handleChange}
                value={formik.values.active}
                >Active
                </Checkbox>
            </FormControl>

            <Button
              mt={5}
              leftIcon={<EditIcon />}
              colorScheme="whatsapp"
              variant="solid"
              type="submit"
            >
              Save
            </Button>
          </form>

          <Divider m={5} />

          <Box boxSize="sm">
            <Image src="/img/Image-not-found.png" alt="Segun Adebayo" width="400" height="400" />
          </Box>

          <Button mt={7} leftIcon={<EditIcon />} colorScheme="pink" variant="solid" onClick={()=>connect()}>
            Connect
          </Button>
        </div>
      )}
    </AdminLayout>
  );
}
