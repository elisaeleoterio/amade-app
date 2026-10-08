import { cn } from "@/lib/utils";
import { Role } from "@/types/role.type";
import { TextInput } from "react-native";

const roleStyles: Record<Role, string> = {
  admin: "focus:border-admin-main bg-admin-main/5 text-admin-dark",
  lojista: "focus:border-lojista-main bg-lojista-main/5 text-lojista-dark",
  artesao: "focus:border-artesao-main bg-artesao-main/5 text-artesao-dark",
};

function Input({
  appRole = "admin",
  className,
  style,
  ...props
}: React.ComponentProps<typeof TextInput> &
  React.RefAttributes<TextInput> & { appRole?: Role }) {
  return (
    <TextInput
      style={[
        { height: 46, textAlignVertical: "center", paddingVertical: 0 },
        style,
      ]}
      className={cn(
        "focus:border-2 font-poppins-regular rounded-2xl px-4 text-lg",
        roleStyles[appRole] || roleStyles.admin,
        props.editable === false && "opacity-20",
        className,
      )}
      placeholderTextColor={"#D1D1D1"}
      {...props}
    />
  );
}

export { Input };
