export const calculateNumberOfPages = (totalResults, resultsPerPage) => {
    if (resultsPerPage === 0) return 0;
    return Math.ceil(totalResults / resultsPerPage);
};
