import Modal from "react-modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Define o elemento raíz para acessibilidade

function ModalEnterprise({
  isOpen,
  onRequestClose,
  isCreating,
  currentItem,
  onChange,
  onSave,
  onCancel,
}) {
  const handleSave = () => {
    // Verificação básica para garantir que todos os campos obrigatórios estão preenchidos
    const requiredFields = ["name", "companyName", "collaboratorsCount"];
    const isValid = requiredFields.every(
      (field) =>
        currentItem[field] && currentItem[field].toString().trim() !== ""
    );

    if (isValid) {
      onSave();
    } else {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="modal"
      onRequestClose={onRequestClose}
      contentLabel={isCreating ? "Criar Nova Empresa" : "Editar Empresa"}
    >
      <div className="modal">
        <h2>{isCreating ? "Criar Nova Empresa" : "Editar Empresa"}</h2>
        {currentItem && (
          <form>
            <label>
              Nome: <span className="required">*</span>
              <input
                type="text"
                name="name"
                value={currentItem.name || ""}
                onChange={onChange}
                placeholder="Digite o nome"
              />
            </label>
            <label>
              Nome Empresa: <span className="required">*</span>
              <input
                type="text"
                name="companyName"
                value={currentItem.companyName || ""}
                onChange={onChange}
                placeholder="Digite o nome da empresa"
              />
            </label>
            <label>
              Ativo:
              <input
                type="checkbox"
                name="isActive"
                checked={currentItem.isActive || false}
                onChange={onChange}
              />
            </label>
            <label>
              Funcionários: <span className="required">*</span>
              <input
                type="number"
                name="collaboratorsCount"
                value={currentItem.collaboratorsCount || ""}
                onChange={onChange}
                placeholder="Digite o número de funcionários"
              />
            </label>
            <button type="button" onClick={handleSave}>
              {isCreating ? "Criar" : "Salvar"}
            </button>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}

// Define os PropTypes para o componente
ModalEnterprise.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  currentItem: PropTypes.shape({
    name: PropTypes.string,
    companyName: PropTypes.string,
    isActive: PropTypes.bool,
    collaboratorsCount: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalEnterprise;
