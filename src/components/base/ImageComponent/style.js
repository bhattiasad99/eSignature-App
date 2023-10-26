import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const CustomBox = styled(Box)(
  ({ theme, position, overflow, height, width }) => ({
    position: position,
    overflow: overflow,
    height: height,
    width: width,
  }),
)
