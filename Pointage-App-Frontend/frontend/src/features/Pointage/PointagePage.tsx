import React, { useEffect, useState } from "react";
import {
  VStack, Text, Box, Button, Spacer, Avatar, HStack,
  useColorModeValue, Flex,
} from "@chakra-ui/react";
import axios from "axios";
import DerniersPointages from "./DerniersPointages";


type Pointage = {
  date: string;
  heure: string;
  type: "Entree" | "Sortie";
};

type Collaborateur = {
  id: number;
  nom: string;
  prenom: string;
  poste: string;
  idMachin: string;
};

const getDateAujourdhui = (): string => {
  const d = new Date();
  return d.toLocaleDateString("fr-CA"); 
};


const formatHeure = (val?: string | null): string => {
  if (!val) return "-";
  const [h, m] = val.split(":");
  return h && m ? `${h}:${m}` : val.slice(0, 5);
};

const PointagePage: React.FC<{ idMachin: string }> = ({ idMachin }) => {
  const [pointages, setPointages] = useState<Pointage[]>([]);
  const [collaborateur, setCollaborateur] = useState<Collaborateur | null>(null);
  const [loading, setLoading] = useState(false);

  const dateAujourdhui = getDateAujourdhui();
 
  const [refreshKey, setRefreshKey] = useState(0);

 
  useEffect(() => {
    setPointages([]);
    setCollaborateur(null);
    setLoading(false);
  }, [idMachin]);

  
  useEffect(() => {
    const fetchCollaborateur = async () => {
      try {
        const res = await axios.get(`/api/collaborateurs/by-idMachin/${idMachin}`);
        setCollaborateur(res.data);
      } catch (err) {
        console.error("Erreur fetch collaborateur :", err);
      }
    };
    if (idMachin) fetchCollaborateur();
  }, [idMachin]);


  useEffect(() => {
    const fetchPointagesJour = async () => {
      try {
        const res = await axios.get(`/api/pointages/${idMachin}/derniers`);
        const jours: Array<{ date: string; heureEntree?: string | null; heureSortie?: string | null }> = res.data;

        const today = jours.find((j) => j.date === dateAujourdhui);

        const list: Pointage[] = [];
        if (today?.heureEntree) {
          list.push({ date: today.date, heure: formatHeure(today.heureEntree), type: "Entree" });
        }
        if (today?.heureSortie) {
          list.push({ date: today.date, heure: formatHeure(today.heureSortie), type: "Sortie" });
        }

        setPointages(list);
        
      } catch (err) {
        console.error("Erreur fetch pointages jour :", err);
      }
    };
    if (idMachin) {
        fetchPointagesJour();
    }
      
  }, [idMachin, dateAujourdhui]);

  const pointagesAujourdHui = pointages.filter((p) => p.date === dateAujourdhui);
  const peutPointer = pointagesAujourdHui.length < 2;


  const handlePointage = async () => {
    if (!collaborateur) return;
    setLoading(true);

    const type: "Entree" | "Sortie" = pointagesAujourdHui.length === 0 ? "Entree" : "Sortie";

    try {
      const res = await axios.post(`/api/pointages/${idMachin}/${type}`, {});
      const h = type === "Entree"
        ? (res.data.heure ?? res.data.heureEntree ?? null)
        : (res.data.heure ?? res.data.heureSortie ?? null);

      const nouveauPointage: Pointage = {
        date: res.data.date,
        heure: formatHeure(h),
        type,
      };

      setPointages((prev) => {
        const filtered = prev.filter((p) => !(p.date === nouveauPointage.date && p.type === nouveauPointage.type));
        return [...filtered, nouveauPointage].sort((a, b) =>
          a.type === "Entree" && b.type === "Sortie" ? -1 : 1
        );
      });
      setRefreshKey((prev) => prev + 1);
      console.log(refreshKey)
    } catch (err) {
      console.error("Erreur enregistrement pointage :", err);
    } finally {
      setLoading(false);
    }
  };

  const borderBox = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      
      <Box 
        p={5}
        pt="65px"
        >
        <Spacer />
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb={6}
          p={5}
          bg="whiteAlpha.500"
          border="1px solid"
          borderColor={borderBox}
          borderRadius="2xl"
          boxShadow="md"
        >
          <HStack spacing={4} align="center">
            <Avatar size="lg" src="/src/assets/profil.jpg" name={collaborateur ? collaborateur.nom : "Collaborateur"} />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Bonjour, {collaborateur ? `${collaborateur.prenom} ${collaborateur.nom}` : "Chargement..."}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {collaborateur?.poste}
              </Text>
            </Box>
          </HStack>
        </Flex>

        <VStack spacing={6} align="stretch">
  
  <Text fontSize="xl" fontWeight="bold" color="gray.700">
    Pointage du {dateAujourdhui}
  </Text>

  
  <Box
    p={5}
    border="1px solid"
    borderColor={borderBox}
    borderRadius="xl"
    bg={useColorModeValue("gray.50", "gray.800")}
    boxShadow="sm"
    w="fit-content"   
    mx="auto"
  >
    {pointagesAujourdHui.length === 0 ? (
      <Text fontSize="md" color="gray.500">
        Aucun pointage enregistré aujourd’hui.
      </Text>
    ) : (
      pointagesAujourdHui.map((p, idx) => (
        <Text
          key={idx}
          fontSize="md"
          fontWeight="medium"
          color={p.type === "Entree" ? "green.600" : "blue.600"}
          mb={1}
        >
          {p.type === "Entree" ? " Entrée" : " Sortie"} à {p.heure}
        </Text>
      ))
    )}
  </Box>

  
  <Button
    onClick={handlePointage}
    isDisabled={!peutPointer}
    isLoading={loading}
    loadingText="Enregistrement..."
    size="lg"
    borderRadius="full"
    fontSize="lg"
    px={8}
    alignSelf="center"
    bg="#D92344"
    color="white"
    _hover={{ bg: "#b81c35" }}
    _active={{ bg: "#9e182d" }}
    shadow="md"
  >
    {pointagesAujourdHui.length === 0
      ? "Pointer (Entrée)"
      : pointagesAujourdHui.length === 1
      ? "Pointer (Sortie)"
      : "Pointage terminé"}
  </Button>
  <Box mt={6}>
    <DerniersPointages idMachin={idMachin} refreshKey={refreshKey} />
  </Box>
</VStack>

      </Box>
    </>
  );
};

export default PointagePage;
