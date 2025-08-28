import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

type Collaborateur = {
  id: number;
  nom: string;
  prenom: string;
  idMachin: string;
  email: string;
  poste: string;
  active: boolean;
};


type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
};

export default function CollaborateursAdmin() {
  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>([]);
  const [selected, setSelected] = useState<Collaborateur | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    idMachin: "",
    email: "",
    poste: "",
  });

  
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState(""); // 🔹 recherche par nom

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchCollaborateurs();
  }, [page, search]);

  const fetchCollaborateurs = async () => {
    try {
      const endpoint = search
        ? `/collaborateurs/search?nom=${search}&page=${page}&size=${size}`
        : `/collaborateurs?page=${page}&size=${size}`;

      const response = await api.get<PageResponse<Collaborateur>>(endpoint);
      setCollaborateurs(response.data.content);
      setTotalPages(Math.max(response.data.totalPages,1));
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur lors du chargement",
        status: "error",
        duration: 2000,
      });
    }
  };

  const resetForm = () => {
    setFormData({ nom: "", prenom: "", idMachin: "", email: "", poste: "" });
    setSelected(null);
  };

  const handleOpenModal = () => {
    resetForm();
    onOpen();
  };

  const handleSave = async () => {
    if (!formData.nom || !formData.prenom || !formData.idMachin || !formData.email || !formData.poste) {
      toast({ title: "Tous les champs sont obligatoires.", status: "warning", duration: 2000 });
      return;
    }

    try {
      if (selected) {
        const payload = { ...selected, ...formData, active: selected.active };
        const response = await api.put(`/collaborateurs/${selected.id}`, payload);
        setCollaborateurs(prev => prev.map(c => (c.id === selected.id ? response.data : c)));
        toast({ title: "Collaborateur modifié", status: "success", duration: 2000 });
      } else {
        const payload = { ...formData, active: true };
        const response = await api.post("/collaborateurs", payload);
        setCollaborateurs(prev => [...prev, response.data]);
        toast({ title: "Collaborateur ajouté", status: "success", duration: 2000 });
      }

      onClose();
      resetForm();
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur lors de la sauvegarde", status: "error", duration: 2000 });
    }
  };

  const handleEdit = (c: Collaborateur) => {
    setSelected(c);
    setFormData({
      nom: c.nom || "",
      prenom: c.prenom || "",
      idMachin: c.idMachin || "",
      email: c.email || "",
      poste: c.poste || "",
    });
    onOpen();
  };

  const toggleActivation = async (c: Collaborateur) => {
    try {
      const payload = { ...c, active: !c.active };
      const response = await api.put(`/collaborateurs/${c.id}`, payload);
      setCollaborateurs(prev =>
        prev.map(item => (item.id === c.id ? response.data : item))
      );
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur lors de la mise à jour", status: "error", duration: 2000 });
    }
  };

  /*const handleDelete = async (id: number) => {
    try {
      await api.delete(`/collaborateurs/${id}`);
      setCollaborateurs(prev => prev.filter(c => c.id !== id));
      toast({ title: "Collaborateur supprimé", status: "success", duration: 2000 });
    } catch (error) {
      console.error(error);
      toast({ title: "Erreur lors de la suppression", status: "error", duration: 2000 });
    }
  };*/

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="#9D2235">Gestion des Collaborateurs</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="red" bg="#9D2235" onClick={handleOpenModal}>
          Ajouter Collaborateur
        </Button>
      </Flex>

      {/* 🔹 Barre de recherche */}
      <Flex mb={4} gap={3}>
        <Input
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => { setPage(0); setSearch(e.target.value); }}
        />
        <Button onClick={() => fetchCollaborateurs()} colorScheme="blue">
          Rechercher
        </Button>
      </Flex>

      <TableContainer bg="white" borderRadius="xl" boxShadow="md">
        <Table variant="simple">
          <Thead bg="#F2E3C6">
            <Tr>
              <Th>Nom</Th>
              <Th>Prénom</Th>
              <Th>Email</Th>
              <Th>Poste</Th>
              <Th>ID Machine</Th>
              <Th>Statut</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
  {collaborateurs.length > 0 ? (
    collaborateurs.map(c => (
      <Tr key={c.id}>
        <Td>{c.nom}</Td>
        <Td>{c.prenom}</Td>
        <Td>{c.email}</Td>
        <Td>{c.poste}</Td>
        <Td>{c.idMachin}</Td>
        <Td>
          <Switch
            colorScheme="red"
            isChecked={c.active}
            onChange={() => toggleActivation(c)}
          />
        </Td>
        <Td>
          <IconButton
            icon={<EditIcon />}
            size="sm"
            aria-label="Modifier"
            onClick={() => handleEdit(c)}
            mr={2}
          />
          
        </Td>
      </Tr>
    ))
  ) : (
    <Tr>
      <Td colSpan={7} textAlign="center" py={6} fontStyle="italic" color="gray.500">
        Aucun collaborateur trouvé
      </Td>
    </Tr>
  )}
</Tbody>

        </Table>
      </TableContainer>

      {/* 🔹 Pagination Controls */}
      <Flex justify="center" align="center" mt={4} gap={2}>
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 0))} isDisabled={page === 0}>
          <Box fontSize="4xl" color="blue.500" cursor="pointer">
            ←
          </Box>
        </Button>
        <Box>
          Page {page + 1} / {totalPages} ({totalElements} collaborateurs)
        </Box>
        <Button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          isDisabled={page >= totalPages - 1}
        >
          <Box fontSize="4xl" color="red.500" cursor="pointer">
          →
          </Box>
        </Button>
      </Flex>

      {/* 🔹 Modal Ajout/Modification */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#9D2235">{selected ? "Modifier Collaborateur" : "Ajouter Collaborateur"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nom</FormLabel>
                <Input value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Prénom</FormLabel>
                <Input value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Poste</FormLabel>
                <Input value={formData.poste} onChange={e => setFormData({ ...formData, poste: e.target.value })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>ID Machine</FormLabel>
                <Input value={formData.idMachin} onChange={e => setFormData({ ...formData, idMachin: e.target.value })} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal} mr={3}>Annuler</Button>
            <Button bg="#9D2235" color="white" onClick={handleSave}>
              Sauvegarder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
