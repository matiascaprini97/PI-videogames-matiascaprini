import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from "../../redux/actions";
import styles from "./Pagination.module.scss"

const Pagination = ({ totalPages }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.currentPage);
    const rangeStart = useSelector((state) => state.rangeStart);
    const rangeEnd = useSelector((state) => state.rangeEnd);
    const games = useSelector((state) => state.videoGames);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    return (
        <div className={classes.controls}>
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={classes.pageButton}
            >
                First
            </button>
            <button
                className={classes.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<<'}
            </button>

            {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${classes.pageButton} ${page === currentPage ? classes.activePage : ''}`}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}

            {rangeEnd < totalPages && (
                <>
                    <span>...</span>
                    <button onClick={() => handlePageChange(totalPages)} className={classes.pageButton}>
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={classes.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * 20 >= games.length}
            >
                {'>>'}
            </button>

            <button
                onClick={() => handlePageChange(totalPages)}
                className={classes.pageButton}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
