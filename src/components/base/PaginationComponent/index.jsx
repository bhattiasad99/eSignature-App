import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({
  handleUpdatePage = () => {
    return;
  },
  currentPage = 1,
  totalPages = 10,
  color = "primary",
  variant = "outlined",
  ...otherProps
}) {
  const handleChange = (event, value) => {
    handleUpdatePage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        page={currentPage}
        onChange={handleChange}
        count={totalPages}
        variant={variant}
        color={color}
        {...otherProps}
      />
    </Stack>
  );
}

PaginationComponent.propTypes = {
  color: PropTypes.string,
  currentPage: PropTypes.number,
  handleUpdatePage: PropTypes.func,
  totalPages: PropTypes.number,
  variant: PropTypes.string,
};
