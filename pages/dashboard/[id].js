import React, {useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Button,
  FormControl, FormLabel, Input, useToast
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { EditIcon } from '@chakra-ui/icons';
import {getProviders} from '../../api/provider';
import { useRouter } from 'next/router'
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProvider } from '../../api/provider';
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
        const providers = response.providers
        const provider = providers.filter(provider => provider._id === query.id)[0];

        console.log("providers:1",providers)
        console.log("providers:2",provider)
        setProvider(provider)


        setUpdateProvider(false);
        setLoading(true)
        
      }
    })();
  }, [updateProvider, auth]);


  function initialValues() {
    return {
      phone: provider ? provider.phone : "",
    };
  }
  
  
  function validationSchema() {
    return {
      phone: Yup.string().required(true),
    };
  }
  

  const formik = useFormik({
    enableReinitialize :  true,
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
    { !loading && ( <h1>Loading...</h1> )}
    { loading && (
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
              <h1></h1>
          </FormControl>
          
            <Button mt={2}  leftIcon={<EditIcon />} colorScheme="whatsapp" variant="solid" type="submit">
                      Save
            </Button>
         

          <p>{query.id}</p>
          <p>{provider ? provider.phone : "-"}</p>
        </form>
      </div>
    )  }
    
      
    </AdminLayout>
  );
}



