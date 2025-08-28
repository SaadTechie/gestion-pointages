import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  VStack,
  Text,
  useToast,
  Image,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !motDePasse) {
      toast({
        title: "Tous les champs sont obligatoires",
        status: "warning",
        duration: 2000,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: motDePasse }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Email ou mot de passe incorrect");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur l'espace administrateur.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/adminlayouts");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Échec de connexion",
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
          p={10}
          borderRadius="lg"
          boxShadow="lg"
          w="100%"
          maxW="400px"
        >
          <VStack spacing={6} align="stretch">
            <Image
              src="/src/assets/Logo_Royal_Air_Maroc.svg"
              alt="Logo RAM"
              boxSize="80px"
              objectFit="contain"
              mx="auto"
            />

            <Heading textAlign="center" color="#B90E0A" fontSize="2xl">
              Connexion
            </Heading>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="#B90E0A"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  focusBorderColor="#B90E0A"
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Voir le mot de passe"
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack w="100%" justify="space-between">
              <Button
                colorScheme="red"
                bg="#B90E0A"
                onClick={handleLogin}
                isLoading={loading}
              >
                Se connecter
              </Button>
              <Text
                fontSize="sm"
                color="blue.500"
                textAlign="right"
                cursor="pointer"
                onClick={() => navigate("/reset-password")}
              >
                Modifier Password
              </Text>
            </HStack>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              © Royal Air Maroc
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
