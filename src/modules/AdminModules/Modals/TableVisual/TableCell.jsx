import { Input, Typography } from "@material-tailwind/react";

export default function TableCell({ data }) {
  return (
    <>
      <td
        className="p-4 w-auto  
        text-ellipsis
        whitespace-nowrap 
        overflow-x-auto 
        border border-gray-200"
      >
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data || "No data available"}
        </Typography>
      </td>
    </>
  );
}

// export default function TableCell({ data, isEditing, handleEdit, productKey }) {
//   return (
//     <>
//       <td className="p-4">
//         {isEditing ? (
//           <Input
//             type="text"
//             defaultValue={data}
//             onChange={(e) => {
//               console.log(`Editing ${productKey}`);
//               handleEdit(productKey, e.target.value);
//             }}
//           />
//         ) : (
//           <Typography variant="small" color="blue-gray" className="font-normal">
//             {data}
//           </Typography>
//         )}
//       </td>
//     </>
//   );
// }
