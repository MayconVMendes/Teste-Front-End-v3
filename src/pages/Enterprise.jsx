import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  getCompanies,
  deleteCompany,
  updateCompany,
  createCompany,
  getCompanieId,
} from "../services/Api";
import TableEnterprise from "../components/TableEnterprise";
import ModalEnterprise from "../components/ModalEnterprise";
import { toast } from "react-toastify";

function Enterprise() {
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { page: currentPageParam } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(currentPageParam) || 1
  );
  const [itemsPerPage] = useState(10);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchId, setSearchId] = useState(""); // Estado para armazenar o ID de pesquisa
  const [searchResult, setSearchResult] = useState(null); // Estado para armazenar o resultado da pesquisa

  useEffect(() => {
    if (!user) {
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        saveUser(parsedUserData);
      } else {
        navigate(`/login`);
      }
    } else {
      fetchData();
    }
  }, [user, saveUser, navigate, location]);

  const fetchData = async () => {
    try {
      const companies = await getCompanies();
      setData(companies);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchById = async (id) => {
    try {
      const company = await getCompanieId(id);
      setSearchResult(company);
    } catch (error) {
      setSearchResult(null);
      toast.error(error + "Empresa não encontrada.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      setSearchResult(null);
      setSearchId("");
      fetchData();
      toast.success("Empresa excluída com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setCurrentItem({
      name: "",
      companyName: "",
      isActive: false,
      collaboratorsCount: 0,
    });
    setIsCreating(true);
    setModalIsOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsCreating(false);
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        await createCompany(currentItem);
        toast.success("Empresa criada com sucesso!");
      } else {
        await updateCompany(currentItem.id, currentItem);
        setSearchResult(null);
        setSearchId("");
        toast.success("Empresa alterada com sucesso!");
      }
      fetchData();
      setModalIsOpen(false);
    } catch (error) {
      toast.error(error + "Ocorreu um erro!");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/empresa/${page}`);
  };

  const handleSearch = () => {
    if (searchId.trim() === "") {
      toast.warning("O campo ID é obrigatório.");
      return;
    } else {
      fetchById(searchId);
    }
  };

  return (
    <div className="enterprise">
      <h2>Empresa, Página nº {currentPage}</h2>
      <button className="add" onClick={handleCreate}>
        Adicionar Nova Empresa
      </button>
      {/* Campo de pesquisa */}
      <div className="search">
        <input
          type="text"
          placeholder="Pesquisar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      {searchResult && (
        <div className="search-result">
          <h3>Resultado da Pesquisa:</h3>
          <TableEnterprise
            items={[searchResult]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
      <TableEnterprise
        items={currentItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ModalEnterprise
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        isCreating={isCreating}
        currentItem={currentItem}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={() => setModalIsOpen(false)}
      />
    </div>
  );
}

export default Enterprise;
