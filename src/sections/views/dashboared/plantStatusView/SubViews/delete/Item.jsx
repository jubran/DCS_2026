// import { Box, Avatar, Typography, Stack, Rating } from "@mui/material";
// import { svgIconClasses } from "@mui/material/SvgIcon";
// import Iconify from "src/components/iconify";
// import Label from "src/components/label";
// import { fCurrency, fData, fShortenNumber } from "src/utils/format-time";

// export function Item({ item, sx, ...other }) {
//   return (
//     <Box
//       sx={[
//         { gap: 2, display: "flex", alignItems: "center" },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Avatar
//         variant="rounded"
//         src={item.shortcut}
//         sx={{ p: 1, width: 48, height: 48, bgcolor: "background.neutral" }}
//       />
//       <div>
//         <Box sx={{ mb: 1, gap: 1, display: "flex", alignItems: "center" }}>
//           <Typography variant="subtitle2" noWrap>
//             {item.name}
//           </Typography>
//           <Label color={item.price === 0 ? "default" : "success"} sx={{ height: 20 }}>
//             {item.price === 0 ? "Free" : fCurrency(item.price)}
//           </Label>
//         </Box>
//         <Stack
//           divider={
//             <Box
//               sx={{
//                 width: 4,
//                 height: 4,
//                 borderRadius: "50%",
//                 bgcolor: "text.disabled",
//               }}
//             />
//           }
//           sx={{
//             gap: 1,
//             flexDirection: "row",
//             alignItems: "center",
//             typography: "caption",
//           }}
//         >
//           <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
//             <Iconify width={16} icon="solar:download-bold" sx={{ color: "text.disabled" }} />
//             {fShortenNumber(item.downloaded)}
//           </Box>
//           <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
//             <Iconify width={16} icon="heroicons:server-solid" sx={{ color: "text.disabled" }} />
//             {fData(item.size)}
//           </Box>
//           <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
//             <Rating
//               readOnly
//               size="small"
//               precision={0.5}
//               value={item.ratingNumber}
//               max={1}
//               sx={{ [` .${svgIconClasses.root}`]: { width: 16, height: 16 } }}
//             />
//             {fShortenNumber(item.totalReviews)}
//           </Box>
//         </Stack>
//       </div>
//     </Box>
//   );
// }