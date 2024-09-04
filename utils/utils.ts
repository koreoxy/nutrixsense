export const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const pages: (number | string)[] = []; // Explicitly typed

  if (totalPages <= 1) return pages;

  // Always show the first page
  pages.push(1);

  // Add "..." if currentPage is far from the start
  if (currentPage > 3) {
    pages.push("...");
  }

  // Add the page before currentPage if not the first page
  if (currentPage > 2) {
    pages.push(currentPage - 1);
  }

  // Add the current page
  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage);
  }

  // Add the page after currentPage if not the last page
  if (currentPage < totalPages - 1) {
    pages.push(currentPage + 1);
  }

  // Add "..." if currentPage is far from the end
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Always show the last page
  pages.push(totalPages);

  return pages;
};
