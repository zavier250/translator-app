// src/module components.tsx

export const inputStyles = {
size: "md",
borderRadius: "full",
pl: 4,
_placeholder: { color: "gray.400", fontSize: "sm" },
focusBorderColor: "blue.500",
errorBorderColor: "red.500",
border: "1px solid",
borderColor: "gray.300",
color: "gray.800",
width: "100%",
maxWidth: "400px", // control maximize in 400px
mx: "auto", // align center
_invalid: {
borderColor: "red.500", // red border when wrong input
boxShadow: "none",
},
_focus: {
borderColor: "blue.500", 
boxShadow: "none",
},
};
export const buttonStyles = {
borderRadius: "full",
fontWeight: "semibold",
_hover: { transform:"translateY(-1px)", shadow: "md" },
transition: "all 0.2s",
};
  