import { Flex, Text, Image } from "@chakra-ui/react";
import logo from "../assets/Logo_Royal_Air_Maroc.svg";

const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      bg="white"
      color="gray.800"
      px={{ base: 4, md: 10 }}
      py={6}
      align="center"
      justify="space-between"
      boxShadow="sm"
      zIndex={1000}
    >
   
      <Flex align="center" gap={3}>
        <Image src={logo} alt="RAM Logo" boxSize={{ base: "40px", md: "55px" }} />
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="bold"
          lineHeight="short"
        >
          <Text as="span" color="#D92344">
            Pointage 
          </Text>{" "}
          -  Royal Air Maroc
        </Text>
      </Flex>

     
      <Text
        fontSize="sm"
        color="gray.600"
        fontWeight="medium"
        display={{ base: "none", md: "block" }}
      >
        Suivi de présence et assiduité
      </Text>
    </Flex>
  );
};

export default Header;
