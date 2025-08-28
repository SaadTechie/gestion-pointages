import { Box, VStack, Text, Divider, Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import  { ChevronLeft, ChevronRight, Users,  LayoutDashboard, Clock } from "lucide-react";

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const AdminSidebar: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <Box
      w={collapsed ? "70px" : "250px"}
      minH="85vh"
      bg="gray.50"
      color="gray.700"
      p={3}
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      transition="width 0.3s"
      position="sticky"
      top="95px"
    >
     
      <Box display="flex" justifyContent={collapsed ? "center" : "flex-end"}>
        <IconButton
          aria-label="Collapse sidebar"
          icon={collapsed ? <ChevronRight /> : <ChevronLeft />}
          size="sm"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
        />
      </Box>

      
      {!collapsed && (
        <Box mb={4} pl={2}>
          <Text fontSize="xl" fontWeight="bold" color="red.600">
            Admin
          </Text>
          <Text fontSize="sm" color="gray.500">
            Espace Administrateur
          </Text>
        </Box>
      )}

      <Divider borderColor="gray.200" />

      
      <VStack align="start" spacing={2} mt={4}>
        <Tooltip label="Tableau de bord" placement="right" isDisabled={!collapsed}>
          <Button
            as={Link}
            to="/admin/dashboard"
            leftIcon={<LayoutDashboard size={18} />}
            variant="ghost"
            justifyContent={collapsed ? "center" : "flex-start"}
            w="100%"
          >
            {!collapsed && "Tableau de bord"}
          </Button>
        </Tooltip>

        <Tooltip label="Collaborateurs" placement="right" isDisabled={!collapsed}>
          <Button
            as={Link}
            to="/admin/collaborateurs"
            leftIcon={<Users size={18} />}
            variant="ghost"
            justifyContent={collapsed ? "center" : "flex-start"}
            w="100%"
          >
            {!collapsed && "Collaborateurs"}
          </Button>
        </Tooltip>

        <Tooltip label="Pointages" placement="right" isDisabled={!collapsed}>
          <Button
            as={Link}
            to="/admin/HistoriquePointages"
            leftIcon={<Clock size={18} />}
            variant="ghost"
            justifyContent={collapsed ? "center" : "flex-start"}
            w="100%"
          >
            {!collapsed && "Pointages"}
          </Button>
        </Tooltip>

        
      </VStack>

      <Divider borderColor="gray.200" mt="auto" />

      
      <Tooltip label="logout" placement="right" isDisabled={!collapsed}>
          <Button
            mt={3}
            bg="red.600"
            color="white"
            _hover={{ bg: "red.700" }}
            onClick={handleLogout}
          >
          {!collapsed ? "⏻ Logout" : "⏻"}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default AdminSidebar;
