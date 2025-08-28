import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!email || !ancienMotDePasse || !nouveauMotDePasse || !confirmation) {
      toast({
        title: "Tous les champs sont obligatoires",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (nouveauMotDePasse !== confirmation) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email,
          ancienMotDePasse,
          nouveauMotDePasse,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Échec du changement de mot de passe");
      }

      toast({
        title: "Succès",
        description: "Mot de passe changé avec succès",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur serveur",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative" minH="100vh">
      
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgImage="url('/src/assets/Background_Ram.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter="blur(4px)"
        zIndex={0}
      />

     
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        px={4}
      >
        <Box
          bg="whiteAlpha.800"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          w="100%"
          maxW="400px"
          position="relative"
        >
          
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Retour"
            position="absolute"
            top={2}
            left={2}
            variant="ghost"
            colorScheme="red"
            onClick={() => navigate("/login")}
          />

          <VStack spacing={5} align="stretch">
            <Heading textAlign="center" color="#B90E0A" fontSize="xl">
              Changer le mot de passe
            </Heading>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                focusBorderColor="#B90E0A"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ancien mot de passe</FormLabel>
              <Input
                type="password"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
                placeholder="Ancien mot de passe"
                focusBorderColor="#B90E0A"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <Input
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                placeholder="Nouveau mot de passe"
                focusBorderColor="#B90E0A"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <Input
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="Confirmer le mot de passe"
                focusBorderColor="#B90E0A"
              />
            </FormControl>

            <Button
              colorScheme="red"
              bg="#B90E0A"
              onClick={handleChangePassword}
              isLoading={loading}
            >
              Valider
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
