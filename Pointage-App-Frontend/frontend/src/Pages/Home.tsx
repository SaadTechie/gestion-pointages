import { useEffect, useState } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import PointagePage from "../features/Pointage/PointagePage";
import LoginPage from "../features/auth/LoginPage";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [collaborateurValide, setCollaborateurValide] = useState<boolean | null>(null);
  const [idMachin, setIdMachin] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdMachine = async () => {
      try {
        const res = await fetch("/api/machine/current");
        if (res.ok) {
          const id = await res.text();
          console.log("Bien Reçu",id)
          setIdMachin(id);
        } else {
          setCollaborateurValide(false);
          setLoading(false)
        }
      } catch (e) {
        console.error("Erreur récupération idMachin", e);
        setCollaborateurValide(false);
        setLoading(false)
      }
    };

    fetchIdMachine();
  }, []);

  useEffect(() => {
    const checkCollaborateur = async () => {
      if (!idMachin) return;

      try {
        const response = await fetch(`/api/collaborateurs/by-idMachin/${idMachin}`);

        if (response.ok) {
          const data = await response.json();
          setCollaborateurValide(data?.active === true);
        } else {
          setCollaborateurValide(false);
        }
      } catch (error) {
        setCollaborateurValide(false);
      } finally {
        setLoading(false);
      }
    };

    checkCollaborateur();
  }, [idMachin]);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
        <Text ml={3}>Vérification en cours...</Text>
      </Center>
    );
  }

  

  return ( collaborateurValide && idMachin ? 
    <>
      <Header />
      <Box display="flex" flexDirection="column" minH="100vh" bg="#FDF6EC">
        <Box flex="1" pt="65px">
          <PointagePage idMachin={idMachin} />
        </Box>
        <Footer />
      </Box>
    </>
 
    : 
    <LoginPage/>
  );
};


export default Home;
