import PropTypes from "prop-types";

function Pagination({ totalPages, currentPage, onPageChange }) {
  // Funções auxiliares para navegação
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2; // Número de páginas a mostrar ao redor da página atual

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (currentPage - delta > 2) {
      pageNumbers.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      pageNumbers.push("...");
    }

    return [1, ...pageNumbers, totalPages].filter((page, index, arr) => {
      return arr[index - 1] !== page || page === 1 || page === totalPages;
    });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
