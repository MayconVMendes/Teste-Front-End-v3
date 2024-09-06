import PropTypes from "prop-types";
import Pagination from "./Pagination";

function TableEnterprise({
  items,
  onEdit,
  onDelete,
  totalPages,
  currentPage,
  onPageChange,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Nome Empresa</th>
            <th>Ativo</th>
            <th>Funci.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.companyName}</td>
              <td>{item.isActive ? "Sim" : "Não"}</td>
              <td>{item.collaboratorsCount}</td>
              <td>
                <div className="actions">
                  <button className="edit" onClick={() => onEdit(item)}>
                    Editar
                  </button>
                  <button className="delete" onClick={() => onDelete(item.id)}>
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

TableEnterprise.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      companyName: PropTypes.string,
      isActive: PropTypes.any,
      collaboratorsCount: PropTypes.any,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TableEnterprise;
