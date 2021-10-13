import React, {useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Button,
  FormControl, FormLabel, Input, useToast
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { EditIcon } from '@chakra-ui/icons';
import {getProvider} from '../../api/provider';
import { useRouter } from 'next/router'
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProvider } from '../../api/provider';

export default function Dashboard() {
  const { logout, auth, setReloadUser } = useAuth();
  const [providers, setProviders] = useState([]);
  const [updateProvider, setUpdateProvider] = useState(false);
  
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await getProvider(auth.idUser);
        setProviders(response.providers);
        setUpdateProvider(false);
      }
    })();
  }, [updateProvider, auth]);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
        setIsLoading(true);
        formData.userId = auth.idUser;
        formData.name = "whatsapp";
        formData.active = false;

        const response = await addProvider(formData);
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
      <div className="container">
      <form onSubmit={formik.handleSubmit}>
          <FormControl id="first-name" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input placeholder="Phone"
                      type="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      isInvalid={formik.errors.phone}
                      name="phone"
              />
          </FormControl>
          <Button mt={2}  leftIcon={<EditIcon />} colorScheme="whatsapp" variant="solid" type="submit">
                    Save
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}


function initialValues() {
  return {
    phone: "",
  };
}


function validationSchema() {
  return {
    phone: Yup.string().required(true),
  };
}

