import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";

import { cn } from "@/lib/utils";

const iconVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
      neutral: "text-neutral-500",
      zinc: "text-zinc-400",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type IconProps = LucideProps &
  VariantProps<typeof iconVariants> & {
    as: LucideIcon;
  };

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: "size",
      width: "size",
    },
  },
});

function Icon({
  as: IconComponent,
  className,
  variant,
  size = 14,
  ...props
}: IconProps) {
  return (
    <IconImpl
      as={IconComponent}
      className={cn(iconVariants({ variant }), className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
