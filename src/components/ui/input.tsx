import { cn } from "@/lib/utils";
import { AppRole } from "@/types/app";
import { TextInput } from "react-native";

function Input({
  appRole = "admin",
  className,
  style,
  ...props
}: React.ComponentProps<typeof TextInput> &
  React.RefAttributes<TextInput> & { appRole?: AppRole }) {
  return (
    <TextInput
      style={[
        { height: 46, textAlignVertical: "center", paddingVertical: 0 },
        style,
      ]}
      className={cn(
        `focus:border-2 font-poppins-regular rounded-2xl px-4 text-lg ${appRole == "admin" ? "focus:border-admin-main bg-admin-main/5 text-admin-dark" : "focus:border-lojista-main bg-lojista-main/5 text-lojista-dark"}`,
        props.editable === false && cn("opacity-20"),
        className,
      )}
      placeholderTextColor={"#D1D1D1"}
      {...props}
    />
  );
}

export { Input };
