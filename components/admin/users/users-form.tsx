"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addUser, updateUser } from "@/actions/admin/users";
import { useFormState, useFormStatus } from "react-dom";
import { UserRole, User } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Handle user updates
// export function UserForm({ user }: { user?: User | null }) {
//   const [state, formAction] = useFormState(
//     user == null ? addUser : updateUser.bind(null, user?.id || "")
//   );
//   const { pending } = useFormStatus();

//   // Set default role or handle changes
//   const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
//     user?.role as UserRole | undefined
//   );

//   return (
//     <form className="space-y-6 mt-5" action={formAction}>
//       {/* NAME */}
//       <div className="space-y-2">
//         <Label htmlFor="name">Name</Label>
//         <Input
//           type="text"
//           id="name"
//           name="name"
//           defaultValue={user?.name || ""}
//         />
//         <div>
//           <p
//             aria-live="polite"
//             aria-atomic="true"
//             className="text-sm text-red-500 mt-2"
//           >
//             {state?.error?.name}
//           </p>
//         </div>
//       </div>

//       {/* EMAIL */}
//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <Input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={user?.email || ""}
//         />
//         <div>
//           <p
//             aria-live="polite"
//             aria-atomic="true"
//             className="text-sm text-red-500 mt-2"
//           >
//             {state?.error?.email}
//           </p>
//         </div>
//       </div>

//       {/* PASSWORD */}
//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <Input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="Leave blank to keep current password"
//         />
//         <div>
//           <p
//             aria-live="polite"
//             aria-atomic="true"
//             className="text-sm text-red-500 mt-2"
//           >
//             {state?.error?.password}
//           </p>
//         </div>
//       </div>

//       {/* ROLE */}
//       <div className="space-y-2">
//         <Label htmlFor="role">Role</Label>
//         <Select
//           name="role"
//           value={selectedRole}
//           onValueChange={(value) => setSelectedRole(value as UserRole)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select role" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Role</SelectLabel>
//               {Object.entries(UserRole).map(([key, value]) => {
//                 const formattedKey = key
//                   .replace(/_/g, " ")
//                   .toLowerCase()
//                   .replace(/^\w/, (c) => c.toUpperCase());
//                 return (
//                   <SelectItem key={key} value={value}>
//                     {formattedKey}
//                   </SelectItem>
//                 );
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       <Button type="submit" className="w-full" disabled={pending}>
//         {pending ? "Loading..." : user == null ? "Add" : "Update"}
//       </Button>
//     </form>
//   );
// }

// Handle user updates
export function UserForm({ user }: { user?: User | null }) {
  // @ts-ignore
  const [state, formAction] = useFormState(
    user == null ? addUser : updateUser.bind(null, user?.id || "")
  );
  const { pending } = useFormStatus();

  // Set default role or handle changes
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    user?.role as UserRole | undefined
  );

  return (
    <form className="space-y-6 mt-5" action={formAction}>
      {/* NAME */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name || ""}
        />
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.name}
          </p>
        </div>
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email || ""}
        />
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.email}
          </p>
        </div>
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Leave blank to keep current password"
        />
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-red-500 mt-2"
          >
            {state?.error?.password}
          </p>
        </div>
      </div>

      {/* ROLE */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          name="role"
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as UserRole)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              {Object.entries(UserRole).map(([key, value]) => {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase());
                return (
                  <SelectItem key={key} value={value}>
                    {formattedKey}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Loading..." : user == null ? "Add" : "Update"}
      </Button>
    </form>
  );
}
