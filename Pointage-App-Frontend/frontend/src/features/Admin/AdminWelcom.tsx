
import {  Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Logo from "../../assets/Logo_Royal_Air_Maroc.svg"

const AdminWelcome = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100%"
      p={10}
      bg="gray.50"
    >
      <Image
        src={Logo}
        alt="Logo Royal Air Maroc"
        boxSize="150px"
        mb={6}
      />

      <VStack spacing={4} textAlign="center">
        <Heading size="lg" color="red.700">
          Bienvenue dans l'espace administrateur
        </Heading>
       
        <Text fontSize="sm" color="gray.600">
          Si vous avez besoin d assistance, contactez le service IT interne.
        </Text>
      </VStack>
    </Flex>
  );
};

export default AdminWelcome;
