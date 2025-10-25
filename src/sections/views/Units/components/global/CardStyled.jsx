import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardStyled = styled(Card)(({ theme }) => ({
  minHeight: 400,
  transition: '0.3s',
  '&:hover': { boxShadow: theme.shadows[10] },
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
}));